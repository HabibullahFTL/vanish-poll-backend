import { v4 as uuidv4 } from 'uuid';
import { ICreatePoll } from './polls.interfaces';

export const generateOptions = (
  type: ICreatePoll['type'],
  options: string[]
) => {
  const defaultOptions = ['yes', 'no'];

  return (type === 'yes/no' ? defaultOptions : options)?.map((option) => ({
    id: uuidv4(),
    text: option,
  }));
};

export const getExpiresIn = (expiresIn: ICreatePoll['expiresIn']) => {
  const now = new Date();

  if (expiresIn === '1h') now.setHours(now.getHours() + 1);
  if (expiresIn === '12h') now.setHours(now.getHours() + 12);
  if (expiresIn === '24h') now.setHours(now.getHours() + 24);

  return now;
};

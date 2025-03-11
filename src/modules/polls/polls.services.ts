import { IPoll } from './polls.interfaces';
import PollModel from './polls.model';

const getAllPollsFromDB = async () => {
  const results = await PollModel.find({ isPrivate: false });

  return results;
};

const getPollFromDB = async (pollId: string, shouldIncludeVotes?: boolean) => {
  const result = await PollModel.findById(pollId).select('+vote');

  if (
    !shouldIncludeVotes &&
    result?.hideResults &&
    new Date(result?.expiresIn) > new Date()
  ) {
    result.votes = new Map<string, number>();
  }

  return result;
};

const createPollIntoDB = async (data: Omit<IPoll, 'votes'>) => {
  const result = await PollModel.create(data);

  return result;
};

const PollServices = {
  createPollIntoDB,
  getPollFromDB,
  getAllPollsFromDB,
};
export default PollServices;

import { z } from 'zod';
import {
  createPollValidationSchema,
  voteToPollValidation,
} from './polls.validations';

export type ICreatePoll = z.infer<typeof createPollValidationSchema>['body'];

export interface IPoll
  extends Omit<ICreatePoll, 'options' | 'expiresIn' | 'type'> {
  votes: Map<string, number>;
  options: { id: string; text: string }[];
  expiresIn: Date;
}

export type IVoteToPoll = z.infer<typeof voteToPollValidation>['body'] & {
  votes: Map<string, number>;
};

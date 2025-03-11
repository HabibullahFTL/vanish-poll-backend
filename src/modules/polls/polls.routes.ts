import { Router } from 'express';
import { AnyZodObject } from 'zod';
import { validateRequest } from '../../middlewares/validateRequest';
import PollController from './polls.controllers';
import {
  addReactionToPollValidation,
  createPollValidationSchema,
  voteToPollValidation,
} from './polls.validations';

const PollsRoute = Router();

PollsRoute.get('/:pollId', PollController.getPoll);
PollsRoute.get('/', PollController.getAllPolls);

PollsRoute.post(
  '/create',
  validateRequest(createPollValidationSchema as unknown as AnyZodObject),
  PollController.createPoll
);

PollsRoute.post(
  '/vote',
  validateRequest(voteToPollValidation as unknown as AnyZodObject),
  PollController.voteToPoll
);

PollsRoute.post(
  '/add-reaction',
  validateRequest(addReactionToPollValidation as unknown as AnyZodObject),
  PollController.addReaction
);

export default PollsRoute;

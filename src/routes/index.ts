import { Router } from 'express';
import PollsRoute from '../modules/polls/polls.routes';

const routes = Router();

routes.use('/polls', PollsRoute);

export default routes;

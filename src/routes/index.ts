import { Router } from 'express';
import CommentsRoute from '../modules/comments/comments.routes';
import PollsRoute from '../modules/polls/polls.routes';

const routes = Router();

routes.use('/polls', PollsRoute);
routes.use('/comments', CommentsRoute);

export default routes;

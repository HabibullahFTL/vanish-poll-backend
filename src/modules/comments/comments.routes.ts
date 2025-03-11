import { Router } from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import CommentsControllers from './comments.controllers';
import { addCommentValidation } from './comments.validations';

const CommentsRoute = Router();

CommentsRoute.post(
  '/add-comment',
  validateRequest(addCommentValidation),
  CommentsControllers.addComment
);
CommentsRoute.get('/:pollId', CommentsControllers.getAllComments);

export default CommentsRoute;

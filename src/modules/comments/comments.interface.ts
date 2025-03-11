import { z } from 'zod';
import { addCommentValidation } from './comments.validations';

export type IComment = z.infer<typeof addCommentValidation>['body'];

import { z } from 'zod';

export const addCommentValidation = z.object({
  body: z.object({
    pollId: z
      .string({ required_error: 'Poll ID is required' })
      .min(1, 'Poll ID is required'),
    comment: z
      .string({ required_error: 'Comment is required' })
      .min(1, 'Comment is required'),
  }),
});

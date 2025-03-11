import { z } from 'zod';

export const createPollValidationSchema = z
  .object({
    body: z.object({
      type: z.enum(['yes/no', 'multiple-choice']),
      question: z.string({ required_error: 'Question is required' }),
      options: z
        .array(z.string({ required_error: 'Option is required' }))
        .optional()
        .default([]),
      expiresIn: z.enum(['1h', '12h', '24h']),
      isPrivate: z.boolean().optional().default(false),
      hideResults: z.boolean().optional().default(false),
    }),
  })
  .refine(
    (args) => {
      console.log({ args });

      // Check that options are provided only if type is 'multiple-choice'
      if (
        args.body.type === 'multiple-choice' &&
        args.body.options?.length < 2
      ) {
        return false;
      }
      return true;
    },
    {
      path: ['body', 'options'],
      message: 'Minimum 2 options are required for multiple-choice polls.',
    }
  );

export const voteToPollValidation = z.object({
  body: z.object({
    pollId: z.string({ required_error: 'Poll ID is required' }),
    optionId: z.string({ required_error: 'Option ID is required' }),
  }),
});

export const addReactionToPollValidation = z.object({
  body: z.object({
    pollId: z.string({ required_error: 'Poll ID is required' }),
    reaction: z.enum(['like', 'trending']),
  }),
});

import { model, Schema } from 'mongoose';
import { IComment } from './comments.interface';

const commentsSchema = new Schema<IComment>(
  {
    pollId: {
      type: String,
      required: [true, 'Comment is required'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
  },
  { timestamps: true }
);

const CommentsModel = model<IComment>('comment', commentsSchema);

export default CommentsModel;

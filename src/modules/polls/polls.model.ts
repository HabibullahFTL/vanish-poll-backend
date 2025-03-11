import { model, Schema } from 'mongoose';
import { IPoll } from './polls.interfaces';

const optionSchema = new Schema<IPoll['options'][0]>(
  {
    id: { type: String, required: [true, 'Option is required'] },
    text: { type: String, required: [true, 'Option is required'] },
  },
  { _id: false }
);

const pollSchema = new Schema<IPoll>(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
    },
    options: [optionSchema],
    votes: {
      type: Map,
      of: Number,
      default: {},
      select: 0,
    },
    reactions: {
      type: Map,
      of: {
        type: Number,
        default: 0,
      },
      default: new Map([
        ['like', 0],
        ['trending', 0],
      ]),
    },
    expiresIn: {
      type: Date,
      required: [true, 'Expires in is required'],
    },
    isPrivate: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideResults: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

const PollModel = model<IPoll>('poll', pollSchema);

export default PollModel;

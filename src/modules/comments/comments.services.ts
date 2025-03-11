import { IComment } from './comments.interface';
import CommentsModel from './comments.model';

const addCommentIntoDB = async (data: IComment) => {
  const result = await CommentsModel.create(data);

  return result;
};

const getAllCommentsFromDB = async (pollId: string) => {
  const result = await CommentsModel.find({
    pollId,
  });

  return result;
};

const CommentsServices = { addCommentIntoDB, getAllCommentsFromDB };

export default CommentsServices;

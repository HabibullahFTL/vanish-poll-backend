import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/responseGenerator';
import PollServices from '../polls/polls.services';
import { IComment } from './comments.interface';
import CommentsServices from './comments.services';

const getAllComments = catchAsync(async (req, res) => {
  const pollId = req?.params?.pollId;

  if (!pollId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Poll ID is required');
  }

  const pollDAta = await PollServices.getPollFromDB(pollId);
  if (!pollDAta) {
    throw new AppError(httpStatus.NOT_FOUND, 'No poll found');
  }

  const allComments = await CommentsServices.getAllCommentsFromDB(pollId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    data: allComments,
    message: 'Comments retrieved successfully',
  });
});

const addComment = catchAsync(async (req, res) => {
  const { pollId = '', comment = '' }: IComment = req?.body;

  if (!pollId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Poll ID is required');
  }

  const pollDAta = await PollServices.getPollFromDB(pollId);
  if (!pollDAta) {
    throw new AppError(httpStatus.NOT_FOUND, 'No poll found');
  }

  const commentData = await CommentsServices.addCommentIntoDB({
    comment,
    pollId,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment added successfully',
    data: commentData,
  });
});

const CommentsControllers = { getAllComments, addComment };
export default CommentsControllers;

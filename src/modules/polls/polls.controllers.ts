import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/responseGenerator';
import { ICreatePoll, IVoteToPoll } from './polls.interfaces';
import PollServices from './polls.services';
import { generateOptions, getExpiresIn } from './polls.utils';

const getAllPolls = catchAsync(async (req, res) => {
  const results = await PollServices.getAllPollsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: results,
    message: 'Retrieved all polls',
  });
});

const getPoll = catchAsync(async (req, res) => {
  const pollId = req.params.pollId || '';

  if (!pollId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Poll ID is required');
  }

  const pollDAta = await PollServices.getPollFromDB(pollId);
  if (!pollDAta) {
    throw new AppError(httpStatus.NOT_FOUND, 'No poll found');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: pollDAta,
    message: 'Retrieved all polls',
  });
});

const createPoll = catchAsync(async (req, res) => {
  const data: ICreatePoll = req?.body;

  const options = generateOptions(data?.type, data?.options || []);
  const expiresIn = getExpiresIn(data?.expiresIn);

  const result = await PollServices.createPollIntoDB({
    question: data?.question,
    options,
    expiresIn,
    hideResults: data?.hideResults || false,
    isPrivate: data?.isPrivate || false,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    data: result,
    success: true,
    message: 'Poll created successfully',
  });
});

const voteToPoll = catchAsync(async (req, res) => {
  const data: IVoteToPoll = req?.body;

  const voteKey = `vote_${data?.pollId}`;

  // Checking vote key from cookie
  if (req?.cookies?.[voteKey]) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'You have already voted on this poll.'
    );
  }

  const pollData = await PollServices.getPollFromDB(data?.pollId, true);

  // Checking poll found or not
  if (!pollData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Poll not found');
  }

  // Checking valid option or not
  if (!pollData?.options?.find((option) => option?.id === data?.optionId)) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid option ID');
  }

  // Checking poll expires or not
  if (new Date(pollData?.expiresIn) < new Date()) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Poll has expired');
  }

  // Voting to the poll
  pollData.votes.set(
    data?.optionId,
    (pollData.votes.get(data?.optionId) || 0) + 1
  );
  await pollData.save();

  // Removing vote results if needed
  if (pollData?.hideResults && new Date(pollData?.expiresIn) > new Date()) {
    pollData.votes = new Map<string, number>();
  }

  // Set a cookie to prevent multiple votes (Expires with poll)
  res.cookie(voteKey, 'true', { expires: pollData.expiresIn, httpOnly: true });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    data: pollData,
    success: true,
    message: 'Your vote counted successfully',
  });
});

const PollController = { createPoll, getPoll, getAllPolls, voteToPoll };
export default PollController;

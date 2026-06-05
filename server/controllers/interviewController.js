import Interview from '../models/Interview.js';
import { generateFirstQuestion, processAnswer, generateFinalEvaluation } from '../services/geminiService.js';
import logger from '../src/utils/logger.js';

// @desc    Start a new interview
// @route   POST /api/interview/start
// @access  Private
export const startInterview = async (req, res) => {
  try {
    const { role, difficulty } = req.body;

    // Validate input
    const validRoles = ['MERN', 'Frontend', 'Backend', 'Java', 'DevOps', 'Cybersecurity'];
    const validDifficulties = ['Easy', 'Medium', 'Hard'];

    if (!role || !validRoles.includes(role)) {
      return res.status(400).json({
        message: 'Please select a valid role',
      });
    }

    if (!difficulty || !validDifficulties.includes(difficulty)) {
      return res.status(400).json({
        message: 'Please select a valid difficulty',
      });
    }

    // Generate first question using AI
    const aiResponse = await generateFirstQuestion(role, difficulty);

    logger.info('Interview started', { userId: req.user._id, role, difficulty });

    // Create interview record
    const interview = await Interview.create({
      userId: req.user._id,
      role,
      difficulty,
      status: 'in-progress',
      messages: [
        {
          role: 'interviewer',
          content: aiResponse.nextQuestion,
        },
      ],
      currentQuestionNumber: 1,
    });

    res.status(201).json({
      message: 'Interview started successfully',
      interview: {
        id: interview._id,
        role: interview.role,
        difficulty: interview.difficulty,
        status: interview.status,
        currentQuestion: aiResponse.nextQuestion,
        questionNumber: interview.currentQuestionNumber,
      },
    });
  } catch (error) {
    const { role, difficulty } = req.body;
    logger.error('Failed to start interview', { error: error.message, role, difficulty });
    res.status(500).json({
      message: 'Failed to start interview',
    });
  }
};

// @desc    Submit answer and get next question
// @route   POST /api/interview/:id/answer
// @access  Private
export const submitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { answer } = req.body;

    if (!answer || answer.trim().length === 0) {
      return res.status(400).json({
        message: 'Please provide an answer',
      });
    }

    // Find interview
    const interview = await Interview.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: 'Interview not found',
      });
    }

    if (interview.status !== 'in-progress') {
      return res.status(400).json({
        message: 'Interview is not in progress',
      });
    }

    // Add candidate's answer to messages
    interview.messages.push({
      role: 'candidate',
      content: answer.trim(),
    });

    // Process answer with AI
    const aiResponse = await processAnswer(
      interview.messages,
      answer.trim(),
      interview.role,
      interview.difficulty
    );

    // Add AI feedback and next question
    interview.messages.push({
      role: 'interviewer',
      content: `${aiResponse.feedback}\n\nNext Question: ${aiResponse.nextQuestion}`,
    });

    interview.currentQuestionNumber += 1;
    await interview.save();

    logger.info('Answer processed', { interviewId: interview._id, questionNumber: interview.currentQuestionNumber });

    res.json({
      message: 'Answer submitted successfully',
      feedback: aiResponse.feedback,
      nextQuestion: aiResponse.nextQuestion,
      questionNumber: interview.currentQuestionNumber,
    });
  } catch (error) {
    logger.error('Failed to process answer', { error: error.message, interviewId: id });
    res.status(500).json({
      message: 'Failed to process answer',
    });
  }
};

// @desc    Get interview details
// @route   GET /api/interview/:id
// @access  Private
export const getInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findOne({
      _id: id,
      userId: req.user._id,
    }).populate('userId', 'name email');

    if (!interview) {
      return res.status(404).json({
        message: 'Interview not found',
      });
    }

    res.json({
      interview: {
        id: interview._id,
        role: interview.role,
        difficulty: interview.difficulty,
        status: interview.status,
        createdAt: interview.createdAt,
        messages: interview.messages,
        currentQuestionNumber: interview.currentQuestionNumber,
        feedback: interview.feedback,
      },
    });
  } catch (error) {
    console.error('Get interview error:', error);
    res.status(500).json({
      message: 'Failed to fetch interview',
    });
  }
};

// @desc    Get user's interview history
// @route   GET /api/interviews
// @access  Private
export const getInterviewHistory = async (req, res) => {
  try {
    const interviews = await Interview.find({
      userId: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select('role difficulty status createdAt');

    res.json({
      interviews,
    });
  } catch (error) {
    console.error('Get interview history error:', error);
    res.status(500).json({
      message: 'Failed to fetch interview history',
    });
  }
};

// @desc    Complete an interview
// @route   POST /api/interview/:id/complete
// @access  Private
export const completeInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findOne({
      _id: id,
      userId: req.user._id,
    });

    if (!interview) {
      return res.status(404).json({
        message: 'Interview not found',
      });
    }

    if (interview.status !== 'in-progress') {
      return res.status(400).json({
        message: 'Interview is not in progress',
      });
    }

    // Generate final evaluation
    const evaluation = await generateFinalEvaluation(
      interview.messages,
      interview.role,
      interview.difficulty
    );

    logger.info('Interview completed', { interviewId: interview._id, score: evaluation.score });

    // Update interview
    interview.status = 'completed';
    interview.feedback = JSON.stringify(evaluation);
    await interview.save();

    res.json({
      message: 'Interview completed successfully',
      evaluation,
    });
  } catch (error) {
    logger.error('Failed to complete interview', { error: error.message, interviewId: id });
    res.status(500).json({
      message: 'Failed to complete interview',
    });
  }
};
import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['MERN', 'Frontend', 'Backend', 'Java', 'DevOps', 'Cybersecurity'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard'],
    },
    status: {
      type: String,
      required: true,
      enum: ['in-progress', 'completed'],
      default: 'in-progress',
    },
    messages: [
      {
        role: {
          type: String,
          enum: ['interviewer', 'candidate'],
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    currentQuestionNumber: {
      type: Number,
      default: 1,
    },
    feedback: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  }
);

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
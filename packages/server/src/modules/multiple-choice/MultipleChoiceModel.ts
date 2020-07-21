import mongoose, { Document } from 'mongoose';

const MultipleChoiceSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    statementA: {
      type: String,
      required: true,
      trim: true,
    },
    statementB: {
      type: String,
      required: true,
      trim: true,
    },
    statementC: {
      type: String,
      required: true,
      trim: true,
    },
    statementD: {
      type: String,
      required: true,
      trim: true,
    },
    statementE: {
      type: String,
      required: true,
      trim: true,
    },
    correctAnswer: {
      type: String,
      enum: ['a', 'b', 'c', 'd', 'e'],
    },
    markedAnswer: {
      type: String,
      enum: ['a', 'b', 'c', 'd', 'e'],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'MultipleChoice',
  },
);

export interface IMultipleChoice extends Document {
  question: string;
  statementA: string;
  statementB: string;
  statementC: string;
  statementD: string;
  statementE: string;
  correctAnswer: string;
  markedAnswer: string;
  createdAt: Date;
  updatedAt: Date;
}

const MultipleChoiceModel = mongoose.model<IMultipleChoice>('MultipleChoice', MultipleChoiceSchema);

export default MultipleChoiceModel;

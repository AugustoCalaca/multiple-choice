import mongoose, { Document } from 'mongoose';

const notEmptyArray = (statements: []) => (Array.isArray(statements) && statements.length > 0 ? true : false);

const MultipleChoiceSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      minlength: 3,
      trim: true,
    },
    statements: {
      type: [
        {
          type: String,
          trim: true,
          minlength: 3,
        },
      ],
      required: true,
      validate: [notEmptyArray, 'Please add least one statement in the statements array'],
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
  statements: string[];
  correctAnswer: string;
  markedAnswer: string;
  createdAt: Date;
  updatedAt: Date;
}

const MultipleChoiceModel = mongoose.model<IMultipleChoice>('MultipleChoice', MultipleChoiceSchema);

export default MultipleChoiceModel;

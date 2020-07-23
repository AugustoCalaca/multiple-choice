import MultipleChoiceModel, { IMultipleChoice } from '../../src/modules/multiple-choice/MultipleChoiceModel';

export const createMultipleChoice = async (payload: Partial<IMultipleChoice> = {}) => {
  const n = (global.__COUNTERS__.multipleChoice += 1);

  const { question, statements, correctAnswer, ...rest } = payload;

  return await new MultipleChoiceModel({
    question: question || `What? ${n}`,
    statements: statements || [
      `Statement A. ${n}`,
      `Statement B. ${n}`,
      `Statement C. ${n}`,
      `Statement D. ${n}`,
      `Statement E. ${n}`,
    ],
    correctAnswer: correctAnswer || 'a',
    ...rest,
  }).save();
};

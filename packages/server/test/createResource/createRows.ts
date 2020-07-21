import MultipleChoiceModel, { IMultipleChoice } from '../../src/modules/multiple-choice/MultipleChoiceModel';

export const createMultipleChoice = async (payload: Partial<IMultipleChoice> = {}) => {
  const n = (global.__COUNTERS__.multipleChoice += 1);

  const { question, statementA, statementB, statementC, statementD, statementE, correctAnswer, ...rest } = payload;

  return await new MultipleChoiceModel({
    question: question || `What? ${n}`,
    statementA: statementA || `Statement A. ${n}`,
    statementB: statementB || `Statement B. ${n}`,
    statementC: statementC || `Statement C. ${n}`,
    statementD: statementD || `Statement D. ${n}`,
    statementE: statementE || `Statement E. ${n}`,
    correctAnswer: correctAnswer || 'a',
    ...rest,
  }).save();
};

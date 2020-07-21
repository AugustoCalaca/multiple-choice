import faker from 'faker';

import { connectDatabase } from '../src/common/database';
import MultipleChoiceModel from '../src/modules/multiple-choice/MultipleChoiceModel';

const COUNT_QUESTION = 50;

export const createMultipleChoice = async () => {
  const question = faker.lorem.sentence(5).replace('.', '?');
  const statementA = faker.lorem.sentence(10);
  const statementB = faker.lorem.sentence(10);
  const statementC = faker.lorem.sentence(10);
  const statementD = faker.lorem.sentence(10);
  const statementE = faker.lorem.sentence(10);
  const correctAnswer = faker.random.arrayElement(['a', 'b', 'c', 'd', 'e']);
  const markedAnswer = faker.random.arrayElement(['a', 'b', 'c', 'd', 'e']);

  const multipleChoice = await new MultipleChoiceModel({
    question,
    statementA,
    statementB,
    statementC,
    statementD,
    statementE,
    correctAnswer,
    markedAnswer,
  }).save();

  return multipleChoice;
};

const runSeed = async () => {
  try {
    await connectDatabase();
  } catch (err) {
    // eslint-disable-next-line
    console.error('[SEED] - Error connect database', err);
    process.exit(1);
  }

  try {
    for (let i = 0; i < COUNT_QUESTION; i++) {
      await createMultipleChoice();
    }
  } catch (err) {
    // eslint-disable-next-line
    console.error('[SEED] - Error running seed\n', err);
  }

  process.exit(0);
};

export default runSeed();

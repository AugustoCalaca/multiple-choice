import faker from 'faker';

import { connectDatabase } from '../src/common/database';
import MultipleChoiceModel from '../src/modules/multiple-choice/MultipleChoiceModel';

const COUNT_QUESTION = 50;

export const createMultipleChoice = async () => {
  const question = faker.lorem.sentence(5).replace('.', '?');
  const correctAnswer = faker.random.arrayElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
  const markedAnswer = faker.random.arrayElement(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);

  const statements = [];
  for (let i = 0; i < faker.random.number({ min: 5, max: 10 }); i++) {
    statements.push(faker.lorem.sentence(10));
  }

  const multipleChoice = await new MultipleChoiceModel({
    question,
    statements,
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

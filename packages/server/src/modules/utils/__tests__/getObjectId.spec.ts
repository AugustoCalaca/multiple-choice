import { toGlobalId } from 'graphql-relay';
import { Types } from 'mongoose';

import { getObjectId } from '../../../modules/utils/getObjectId';
import {
  clearDbAndRestartCounters,
  connectMongoose,
  createMultipleChoice,
  disconnectMongoose,
} from '../../../../test/helpers';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

describe('getObjectId', () => {
  it('should return an ObjectId when target is ObjectId', async () => {
    const multipleChoice = await createMultipleChoice();
    const result = getObjectId(multipleChoice._id);

    expect(result instanceof Types.ObjectId).toBe(true);

    expect(result!.equals(multipleChoice._id)).toBe(true);
  });

  it('should return an ObjectId when target is Document', async () => {
    const multipleChoice = await createMultipleChoice();
    const result = getObjectId(multipleChoice);

    expect(result instanceof Types.ObjectId).toBe(true);
    expect(result!.equals(multipleChoice._id)).toBe(true);
  });

  it('should return an ObjectId when target is a GlobalId', async () => {
    const multipleChoice = await createMultipleChoice();
    const result = getObjectId(toGlobalId('MultipleChoice', multipleChoice._id));

    expect(result instanceof Types.ObjectId).toBe(true);
    expect(result!.equals(multipleChoice._id)).toBe(true);
  });

  it('should return an ObjectId from a getObjectId getObjectId', async () => {
    const multipleChoice = await createMultipleChoice();
    const result = getObjectId(getObjectId(toGlobalId('MultipleChoice', multipleChoice._id)));

    expect(result instanceof Types.ObjectId).toBe(true);
    expect(result!.equals(multipleChoice._id)).toBe(true);
  });

  it('should return null on invalid ObjectId', () => {
    expect(getObjectId('invalid string')).toBeNull();
  });

  it('should return null on invalid Object', () => {
    const invalidDoc = { question: 'invalid' };

    expect(getObjectId(invalidDoc)).toBeNull();
  });

  it('should return null on invalid GlobalId', () => {
    const result = getObjectId(toGlobalId('MultipleChoice', 'invalid id'));

    expect(result).toBeNull();
  });
});

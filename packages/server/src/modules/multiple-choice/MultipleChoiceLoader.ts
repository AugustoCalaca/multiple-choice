import { createLoader, registerDataLoader } from '@multiple-choice/graphql';

import MultipleChoiceModel, { IMultipleChoice } from './MultipleChoiceModel';

const {
  Wrapper: MultipleChoice,
  clearCache,
  getLoader,
  load,
  loadAll,
} = createLoader<IMultipleChoice>({
  loaderName: 'MultipleChoiceLoader',
  model: MultipleChoiceModel,
});

registerDataLoader('MultipleChoiceLoader', getLoader);

export { clearCache, getLoader, load, loadAll };
export default MultipleChoice;

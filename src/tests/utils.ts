import { vi } from 'vitest';
import { requirements } from '../../.trybe/requirements.json';

const returnBody = {
  message: 'https://images.dog.ceo/breeds/bulldog-english/murphy.jpg',
  status: 'success',
};

const secondReturnBody = {
  message: 'https://images.dog.ceo/breeds/shiba/shiba-18.jpg',
  status: 'success',
};

const expectedUrl = 'https://dog.ceo/api/breeds/image/random';

const getRequirementDescription = (itemNumber = 1) => {
  const [requirement] = requirements.filter(
    (el) => el.description.startsWith(`${itemNumber} -`),
  );
  return requirement.description;
};

const setupTest = () => {
  global.alert = vi.fn();
  vi.spyOn(global, 'fetch').mockResolvedValue({
    json: vi.fn().mockResolvedValue(returnBody),
  } as any);

  localStorage.clear();
};

export {
  returnBody,
  secondReturnBody,
  expectedUrl,
  getRequirementDescription,
  setupTest,
};

import { getSettings } from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

afterEach(() => {
  jest.restoreAllMocks();
});

const { getItemMock } = mockLocalStorage();

it(`Should generate default settings if data is not stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(null);
  const settings = getSettings();
  expect(settings).toStrictEqual({
    animation: true,
    hovertips: true,
    theme: 'dark'
  });
});

it(`Should generate overridden settings if data is stored in local storage`, () => {
  getItemMock.mockReturnValueOnce(
    JSON.stringify({
      animation: 'true',
      hovertips: 'false'
    })
  );
  const settings = getSettings();
  expect(settings).toStrictEqual({
    animation: true,
    hovertips: false,
    theme: 'dark'
  });
});

import { navigateBetweenPresets } from '../../src/utils';
import { mockLocalStorage } from '../mockLocalStorage';

const { setItemMock } = mockLocalStorage();

function generateSettings(current?: string) {
  current = current ?? 'default';
  return {
    current,
    presets: [
      {
        id: 'default',
        name: 'Default',
        data: {}
      },
      {
        id: 'preset1',
        name: 'Preset 1',
        data: {}
      }
    ]
  };
}

it(`Should not move when correct code is not pressed`, () => {
  const setSettingsSpy = jest.fn();
  navigateBetweenPresets(
    { nativeEvent: { altKey: true, code: 'KeyD' } } as any,
    generateSettings('default'),
    setSettingsSpy,
    'reinforz'
  );
  expect(setItemMock).not.toHaveBeenCalled();
  expect(setSettingsSpy).not.toHaveBeenCalled();
});

it(`Should not move forward when there is only one preset`, () => {
  const setSettingsSpy = jest.fn();
  navigateBetweenPresets(
    { nativeEvent: { altKey: true, code: 'KeyA' } } as any,
    {
      current: 'default',
      presets: [
        {
          id: 'default',
          name: 'Default',
          data: {}
        }
      ]
    },
    setSettingsSpy,
    'reinforz'
  );
  expect(setItemMock).not.toHaveBeenCalled();
  expect(setSettingsSpy).not.toHaveBeenCalled();
});

it(`Should move forward when there is more than one preset and current preset is not last`, () => {
  const setSettingsSpy = jest.fn();
  navigateBetweenPresets(
    { nativeEvent: { altKey: true, code: 'KeyS' } } as any,
    generateSettings(),
    setSettingsSpy,
    'reinforz'
  );

  const newSettings = generateSettings('preset1');

  expect(setItemMock).toHaveBeenCalledWith(
    'reinforz',
    JSON.stringify(newSettings)
  );
  expect(setSettingsSpy).toHaveBeenCalledWith(newSettings);
});

it(`Should move forward when there is more than one preset and current preset is last`, () => {
  const setSettingsSpy = jest.fn();
  navigateBetweenPresets(
    { nativeEvent: { altKey: true, code: 'KeyS' } } as any,
    generateSettings('preset1'),
    setSettingsSpy,
    'reinforz'
  );

  const newSettings = generateSettings();

  expect(setItemMock).toHaveBeenCalledWith(
    'reinforz',
    JSON.stringify(newSettings)
  );
  expect(setSettingsSpy).toHaveBeenCalledWith(newSettings);
});

it(`Should move backward when there is more than one preset and current preset is not first`, () => {
  const setSettingsSpy = jest.fn();
  navigateBetweenPresets(
    { nativeEvent: { altKey: true, code: 'KeyA' } } as any,
    generateSettings('preset1'),
    setSettingsSpy,
    'reinforz'
  );

  const newSettings = generateSettings();

  expect(setItemMock).toHaveBeenCalledWith(
    'reinforz',
    JSON.stringify(newSettings)
  );
  expect(setSettingsSpy).toHaveBeenCalledWith(newSettings);
});

it(`Should move backward when there is more than one preset and current preset is first`, () => {
  const setSettingsSpy = jest.fn();
  navigateBetweenPresets(
    { nativeEvent: { altKey: true, code: 'KeyA' } } as any,
    generateSettings(),
    setSettingsSpy,
    'reinforz'
  );

  const newSettings = generateSettings('preset1');

  expect(setItemMock).toHaveBeenCalledWith(
    'reinforz',
    JSON.stringify(newSettings)
  );
  expect(setSettingsSpy).toHaveBeenCalledWith(newSettings);
});

import { ISettings } from '../types';

function checkBoolean<T extends Record<string, string | boolean>>(
  obj: T,
  key: keyof T,
  defaultValue: boolean
) {
  if (obj[key] !== undefined && obj[key] !== null)
    return obj[key] === 'true' ? true : false;
  else return defaultValue;
}

export const getSettings = () => {
  let local_settings: any = localStorage.getItem('SETTINGS');
  local_settings = local_settings ? JSON.parse(local_settings) : {};
  local_settings.animation = checkBoolean(local_settings, 'animation', true);
  local_settings.hovertips = checkBoolean(local_settings, 'hovertips', true);
  local_settings.theme = local_settings.theme || 'dark';
  return local_settings as ISettings;
};

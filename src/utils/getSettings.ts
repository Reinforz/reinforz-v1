import merge from 'lodash.merge';
import { ISettings } from '../types';

export const getSettings = (): ISettings => {
  let localStorageValue: any = localStorage.getItem('SETTINGS');
  localStorageValue = localStorageValue ? JSON.parse(localStorageValue) : {};
  return merge(
    {
      animation: true,
      hovertips: true,
      theme: 'dark'
    },
    localStorageValue
  );
};

import { useTheme } from '@material-ui/styles';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';
import { ExtendedTheme } from '../types';

export default function useThemeSettings() {
  const theme = useTheme() as ExtendedTheme;
  const { settings } = useContext(SettingsContext);
  return { theme, settings };
}

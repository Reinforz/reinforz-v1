
import { useTheme } from '@emotion/react';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

export default function useThemeSettings() {
  const theme = useTheme();
  const { settings } = useContext(SettingsContext);
  return { theme, settings };
}

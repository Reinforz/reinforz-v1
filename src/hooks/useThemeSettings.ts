import { Theme, useTheme } from '@emotion/react';
import { useContext } from 'react';
import { SettingsContext } from '../context/SettingsContext';

/**
 * Hook to return theme and settings
 * @returns theme and settings
 */
export default function useThemeSettings() {
  const theme = useTheme() as Theme;
  const { settings } = useContext(SettingsContext);
  return { theme, settings };
}

import { Theme } from '@emotion/react';
import { darken, lighten, SxProps } from '@mui/material';

export function generateDynamicStyleClasses(theme: Theme): SxProps<Theme> {
  return {
    '& ::-webkit-scrollbar': {
      width: 10
    },
    '& ::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.color.dark
    },
    '& ::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.color.light
    },
    '& pre': {
      background: theme.palette.color.dark,
      padding: 10,
      borderRadius: 3
    },
    '& :not(pre) > code[class*="language-"]': {
      background: theme.palette.color.dark
    },
    '& .line-numbers-rows': {
      background:
        theme.palette.type === 'dark'
          ? darken(theme.palette.color.dark, 0.25)
          : lighten(theme.palette.color.dark, 0.25),
      height:
        theme.palette.type === 'dark'
          ? 'calc(100% - 10px)'
          : 'calc(100% - 8px)',
      paddingTop: theme.palette.type === 'dark' ? 8 : 10
    },
    '& .bg-dark': {
      background: theme.palette.color.dark
    },
    '& .bg-base': {
      background: theme.palette.color.base
    },
    '& .bg-light': {
      background: theme.palette.color.light
    },
    '& .bg-opposite_dark': {
      background: theme.palette.color.opposite_dark
    },
    '& .bg-opposite_base': {
      background: theme.palette.color.opposite_base
    },
    '& .bg-opposite_light': {
      background: theme.palette.color.opposite_light
    },
    '& thead th, & tfoot th': {
      background: theme.palette.color.dark
    },
    '& tbody tr:nth-of-type(odd)': {
      background: theme.palette.color.base
    },
    '& tbody tr:nth-of-type(even)': {
      background: theme.palette.color.light
    },
  }
}

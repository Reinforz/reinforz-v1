import { darken, lighten, makeStyles } from '@material-ui/core';
import { ExtendedTheme } from '../types';

export function generateDynamicStyleClasses() {
  return makeStyles((theme: ExtendedTheme) => ({
    root: {
      '& ::-webkit-scrollbar': {
        width: 10
      },
      '& ::-webkit-scrollbar-track': {
        backgroundColor: theme.color.dark
      },
      '& ::-webkit-scrollbar-thumb': {
        backgroundColor: theme.color.light
      },
      '& pre': {
        background: theme.color.dark,
        padding: 10,
        borderRadius: 3
      },
      '& :not(pre) > code[class*="language-"]': {
        background: theme.color.dark
      },
      '& .line-numbers-rows': {
        background:
          theme.palette.type === 'dark'
            ? darken(theme.color.dark, 0.25)
            : lighten(theme.color.dark, 0.25),
        height:
          theme.palette.type === 'dark'
            ? 'calc(100% - 10px)'
            : 'calc(100% - 8px)',
        paddingTop: theme.palette.type === 'dark' ? 8 : 10
      },
      '& .bg-dark': {
        background: theme.color.dark
      },
      '& .bg-base': {
        background: theme.color.base
      },
      '& .bg-light': {
        background: theme.color.light
      },
      '& .bg-opposite_dark': {
        background: theme.color.opposite_dark
      },
      '& .bg-opposite_base': {
        background: theme.color.opposite_base
      },
      '& .bg-opposite_light': {
        background: theme.color.opposite_light
      },
      '& thead th, & tfoot th': {
        background: theme.color.dark
      },
      '& tbody tr:nth-of-type(odd)': {
        background: theme.color.base
      },
      '& tbody tr:nth-of-type(even)': {
        background: theme.color.light
      }
    }
  }))();
}

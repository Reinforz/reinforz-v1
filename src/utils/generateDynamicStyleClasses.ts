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
    "& .m-1": {
      margin: theme.spacing(1)
    },
    "& .ml-1": {
      marginLeft: theme.spacing(1)
    },
    "& .mr-1": {
      marginRight: theme.spacing(1)
    },
    "& .mb-1": {
      marginBottom: theme.spacing(1)
    },
    "& .mr-2": {
      marginRight: theme.spacing(2)
    },
    "& .p-1": {
      padding: theme.spacing(1)
    },
    "& .pl-1": {
      paddingLeft: theme.spacing(1)
    },
    "& .m-2": {
      margin: theme.spacing(2)
    },
    "& .p-2": {
      padding: theme.spacing(2)
    },
    "& .text-xs": {
      fontSize: "0.75rem",
      lineHeight: "1rem",
    },
    "& .text-sm": {
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
    },
    "& .text-base": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
    "& .text-lg": {
      fontSize: "1.125rem",
      lineHeight: "1.75rem",
    },
    "& .text-xl": {
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
    "& .text-2xl": {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    "& .text-3xl": {
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
    },
    "& .text-4xl": {
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
    },
    "& .text-5xl": {
      fontSize: "3rem",
      lineHeight: "1",
    },
    "& .text-6xl": {
      fontSize: "3.75rem",
      lineHeight: "1",
    }
  }
}

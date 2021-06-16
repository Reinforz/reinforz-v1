import { darken, makeStyles } from '@material-ui/core';
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
        background: darken(theme.color.dark, 0.25)
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
      '& .p-2_5': {
        padding: 2.5
      },
      '& .m-2_5': {
        margin: 2.5
      },
      '& .p-5': {
        padding: 5
      },
      '& .pb-0': {
        paddingBottom: 0
      },
      '& .pr-0': {
        paddingRight: 0
      },
      '& .m-5': {
        margin: 5
      },
      '& .mr-5': {
        marginRight: 5
      },
      '& .mb-5': {
        marginBottom: 5
      },
      '& .mb-0': {
        marginBottom: 0
      },
      '& .flex': {
        display: 'flex'
      },
      '& .flex-1': {
        flex: 1
      },
      '& .ai-c': {
        alignItems: 'center'
      },
      '& .jc-c': {
        justifyContent: 'center'
      },
      '& .jc-sb': {
        justifyContent: 'space-between'
      },
      '& .br-2_5': {
        borderRadius: 2.5
      },
      '& .bold': {
        fontWeight: 'bold'
      },
      '& .fd-c': {
        flexDirection: 'column'
      },
      '& .ta-c': {
        textAlign: 'center'
      },
      '& .us-n': {
        userSelect: 'none'
      },
      '& .tt-c': {
        textTransform: 'capitalize'
      },
      '& .c-p': {
        cursor: 'pointer'
      }
    }
  }))();
}

import { grey } from '@material-ui/core/colors';
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';
import { ExtendedThemeOptions } from '../types';

export function generateTheme(theme: 'dark' | 'light') {
  if (theme === 'dark')
    return createMuiTheme({
      palette: {
        type: 'dark',
        text: {
          primary: grey[100],
          secondary: grey[200]
        },
        background: {
          default: darken(grey[800], 0.25)
        }
      },
      typography: {
        fontFamily: `"Fira Sans"`,
        fontSize: 14
      },
      color: {
        light: grey[800],
        dark: grey[900],
        base: darken(grey[800], 0.25),
        opposite_dark: grey[300],
        opposite_base: grey[200],
        opposite_light: lighten(grey[200], 0.5)
      },
      overrides: {
        MuiTypography: {
          root: {
            color: grey[100]
          }
        },
        MuiInputLabel: {
          root: {
            fontWeight: 'bolder',
            fontSize: '0.85em',
            backgroundColor: grey[900],
            padding: 5
          }
        },
        MuiFormGroup: {
          root: {
            backgroundColor: grey[800],
            margin: 5,
            padding: '0px 0px 0px 5px'
          }
        }
      }
    } as ExtendedThemeOptions);
  else
    return createMuiTheme({
      palette: {
        type: 'light',
        text: {
          primary: grey[900],
          secondary: grey[800]
        },
        background: {
          paper: lighten(grey[200], 0.5),
          default: grey[200]
        }
      },
      color: {
        light: lighten(grey[200], 0.5),
        dark: grey[300],
        base: grey[200],
        opposite_dark: grey[900],
        opposite_base: darken(grey[800], 0.25),
        opposite_light: grey[800]
      },
      typography: {
        fontFamily: `"Fira Sans"`,
        fontSize: 14
      },
      overrides: {
        MuiTypography: {
          root: {
            color: grey[900]
          }
        },
        MuiInputLabel: {
          root: {
            fontWeight: 'bolder',
            fontSize: '1.25em',
            backgroundColor: grey[300],
            padding: 5
          }
        },
        MuiFormGroup: {
          root: {
            backgroundColor: lighten(grey[200], 0.5),
            margin: 5,
            padding: '0px 0px 0px 5px'
          }
        }
      }
    } as ExtendedThemeOptions);
}

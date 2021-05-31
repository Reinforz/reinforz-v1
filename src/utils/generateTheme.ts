import { grey } from '@material-ui/core/colors';
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';
import { ExtendedThemeOptions } from '../types';

export function generateTheme(theme: 'dark' | 'light') {
  const light = theme === 'dark' ? grey[800] : lighten(grey[200], 0.5);
  const dark = theme === 'dark' ? grey[900] : grey[300];
  const base = theme === 'dark' ? darken(grey[800], 0.25) : grey[200];
  const opposite_dark = theme === 'dark' ? grey[300] : grey[900];
  const opposite_base = theme === 'dark' ? grey[200] : darken(grey[800], 0.25);
  const opposite_light = theme === 'dark' ? lighten(grey[200], 0.5) : grey[800];

  if (theme === 'dark')
    return createMuiTheme({
      palette: {
        type: 'dark',
        text: {
          primary: grey[100],
          secondary: grey[200]
        },
        background: {
          default: base
        }
      },
      typography: {
        fontFamily: `"Fira Sans"`,
        fontSize: 14
      },
      color: {
        light,
        dark,
        base,
        opposite_dark,
        opposite_base,
        opposite_light
      },
      overrides: {
        MuiButton: {
          contained: {
            margin: 2.5
          }
        },
        MuiInput: {
          root: {
            padding: 2.5
          }
        },
        MuiCheckbox: {
          root: {
            padding: 0,
            marginRight: 5
          }
        },
        MuiIconButton: {
          root: {
            width: '18px',
            height: '18px'
          }
        },
        MuiButtonBase: {
          root: {
            padding: 0
          }
        },
        MuiFormControlLabel: {
          root: {
            marginLeft: 2.5,
            marginRight: 2.5,
            margin: 2.5,
            padding: 5,
            backgroundColor: light
          }
        },
        MuiFormLabel: {
          root: {
            margin: 2.5,
            padding: 5
          }
        },
        MuiFormControl: {
          root: {
            backgroundColor: light,
            margin: 2.5,
            padding: 2.5
          }
        },
        MuiTypography: {
          root: {
            color: grey[100]
          }
        },
        MuiInputLabel: {
          root: {
            fontWeight: 'bolder',
            fontSize: '1em',
            backgroundColor: dark,
            padding: 5,
            margin: 2.5
          }
        },
        MuiFormGroup: {
          root: {
            backgroundColor: base,
            margin: 2.5,
            padding: 2.5
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
          paper: light,
          default: base
        }
      },
      color: {
        light,
        dark,
        base,
        opposite_dark,
        opposite_base,
        opposite_light
      },
      typography: {
        fontFamily: `"Fira Sans"`,
        fontSize: 14
      },
      overrides: {
        MuiButton: {
          contained: {
            width: `calc(100% - 10px)`,
            margin: 5
          }
        },
        MuiCheckbox: {
          root: {
            padding: 0,
            marginRight: 5
          }
        },
        MuiIconButton: {
          root: {
            width: '18px',
            height: '18px'
          }
        },
        MuiButtonBase: {
          root: {
            padding: 0
          }
        },
        MuiFormControlLabel: {
          root: {
            height: 18,
            marginLeft: 2.5,
            marginRight: 2.5,
            margin: 2.5,
            padding: 5,
            backgroundColor: light
          }
        },
        MuiTypography: {
          root: {
            color: opposite_dark
          }
        },
        MuiInputLabel: {
          root: {
            fontWeight: 'bolder',
            fontSize: '0.85em',
            backgroundColor: dark,
            padding: 5
          }
        },
        MuiFormGroup: {
          root: {
            backgroundColor: light,
            margin: 5,
            padding: '0px 0px 0px 5px'
          }
        }
      }
    } as ExtendedThemeOptions);
}

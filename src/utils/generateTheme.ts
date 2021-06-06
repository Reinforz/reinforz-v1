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
  const textPrimary = theme === 'dark' ? grey[100] : grey[900];
  const textSecondary = theme === 'dark' ? grey[200] : grey[800];

  const themeOptions: ExtendedThemeOptions = {
    palette: {
      type: theme,
      text: {
        primary: textPrimary,
        secondary: textSecondary
      },
      background: {
        default: base
      }
    },
    typography: {
      fontFamily: `Lato`,
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
      MuiListItem: {
        button: {
          '&:hover': {
            backgroundColor: dark
          }
        }
      },
      MuiButton: {
        contained: {
          margin: 2.5
        }
      },
      MuiInput: {
        root: {
          padding: 2.5,
          paddingLeft: 5
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
      MuiRadio: {
        root: {
          padding: 5
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
          color: textPrimary
        }
      },
      MuiInputLabel: {
        root: {
          fontWeight: 'bolder',
          fontSize: '1em',
          backgroundColor: dark,
          padding: 5,
          margin: 2.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
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
  };

  return createMuiTheme(themeOptions);
}

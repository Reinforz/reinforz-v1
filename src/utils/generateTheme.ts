import { PaletteType } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';
import { Color, ExtendedThemeOptions, ISettings } from '../types';

export function generateTheme(settings: ISettings) {
  const { theme, font } = settings;
  const color: Color = {
    base: '',
    dark: '',
    light: '',
    opposite_base: '',
    opposite_dark: '',
    opposite_light: ''
  };
  const text: {
    primary: string;
    secondary: string;
  } = {
    primary: '',
    secondary: ''
  };

  let paletteType: PaletteType = 'dark';

  switch (theme) {
    case 'dark': {
      color.light = grey[800];
      color.dark = grey[900];
      color.base = darken(grey[800], 0.25);
      color.opposite_light = lighten(grey[200], 0.5);
      color.opposite_dark = grey[300];
      color.opposite_base = grey[200];
      text.primary = grey[100];
      text.secondary = grey[200];
      paletteType = 'dark';
      break;
    }
    case 'light': {
      color.light = lighten(grey[200], 0.5);
      color.dark = grey[300];
      color.base = grey[200];
      color.opposite_light = grey[800];
      color.opposite_dark = grey[900];
      color.opposite_base = darken(grey[800], 0.25);
      text.primary = grey[900];
      text.secondary = grey[800];
      paletteType = 'light';
      break;
    }
    case 'polar_night': {
      color.light = '#434C5E';
      color.dark = '#2E3440';
      color.base = '#3B4252';
      color.opposite_dark = '#D8DEE9';
      color.opposite_base = '#E5E9F0';
      color.opposite_light = '#ECEFF4';
      text.primary = grey[100];
      text.secondary = grey[200];
      paletteType = 'dark';
      break;
    }
    case 'snow_storm': {
      color.opposite_light = '#434C5E';
      color.opposite_dark = '#2E3440';
      color.opposite_base = '#3B4252';
      color.light = '#ECEFF4';
      color.dark = '#D8DEE9';
      color.base = '#E5E9F0';
      text.primary = grey[900];
      text.secondary = grey[800];
      paletteType = 'light';
      break;
    }
  }

  const { light, base, dark } = color;

  const themeOptions: ExtendedThemeOptions = {
    theme,
    palette: {
      type: paletteType,
      text: {
        primary: text.primary,
        secondary: text.secondary
      },
      background: {
        default: color.base
      }
    },
    typography: {
      fontFamily:
        font === 'sans-serif'
          ? 'Lato'
          : font === 'serif'
          ? 'Noto Serif'
          : 'Ubuntu Mono',
      fontSize: 14,
      h5: {
        fontWeight: 'bold',
        fontSize: '1.25em'
      },
      h6: {
        fontWeight: 'bold',
        fontSize: '1.15em'
      }
    },
    color,
    overrides: {
      MuiPopover: {
        paper: {
          backgroundColor: base
        }
      },
      MuiListItem: {
        root: {
          '&$selected': {
            backgroundColor: light
          }
        },
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
          marginLeft: 0,
          marginRight: 0,
          margin: 0,
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
          color: text.primary
        }
      },
      MuiInputLabel: {
        root: {
          fontWeight: 'bolder',
          fontSize: '1em',
          backgroundColor: dark,
          padding: 5,
          margin: 0,
          marginBottom: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
      MuiFormGroup: {
        root: {
          backgroundColor: base,
          margin: 0,
          padding: 5
        }
      }
    }
  };

  return createMuiTheme(themeOptions);
}

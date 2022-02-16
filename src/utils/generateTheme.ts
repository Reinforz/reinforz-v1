import { createTheme, darken, lighten, Theme as MaterialUITheme, ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";
import { AllowedTheme, IGlobalSettings } from "../types";

declare module '@emotion/react' {
  export interface Theme extends MaterialUITheme {}
}

interface Color {
  dark: string;
  base: string;
  light: string;
  opposite_dark: string;
  opposite_base: string;
  opposite_light: string;
};

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    type: "dark" | "light"
    theme: AllowedTheme
    color: Color
  }

  interface PaletteOptions {
    type: "dark" | "light"
    theme: AllowedTheme
    color: Color
  }
}

declare module "@mui/material/styles/createTheme" {
  interface PaletteOptions {
    theme: AllowedTheme
    color: Color
  }
}

export function generateTheme(settings: IGlobalSettings) {
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

  let paletteType: "dark" | "light" = 'dark';

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

  const themeOptions: ThemeOptions = {
    palette: {
      theme,
      color,
      type: paletteType,
      text: {
        primary: text.primary,
        secondary: text.secondary
      },
      background: {
        default: color.opposite_dark
      },
      primary: {
        main: settings.color.primary
      },
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
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: color.dark
          }
        }
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: base
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            fontSize: '1em',
            fontWeight: 'bold'
          }
        }
      },
      MuiListItem: {
        styleOverrides: {
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
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            padding: 0,
            marginRight: 5
          }
        }
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            width: '18px',
            height: '18px'
          }
        }
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            paddingLeft: 5
          }
        },
        defaultProps: {
          disableUnderline: true
        }
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            padding: 5
          }
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            margin: 0,
            padding: 0
          }
        }
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0,
            margin: 0,
            padding: 5,
            backgroundColor: light
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            margin: 2.5,
            padding: 5
          }
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: light,
            padding: 5
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: text.primary
          }
        }
      },
      MuiTextField: {
        defaultProps: {
          InputProps: {
            disableUnderline: true
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            paddingBottom: 5
          },
          root: {
            padding: 5,
            paddingLeft: 0
          }
        }
      },
      MuiInputLabel: {
        styleOverrides: {
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
        }
      },
      MuiFormGroup: {
        styleOverrides: {
          root: {
            flexWrap: 'nowrap',
            backgroundColor: base,
            margin: 0,
            padding: 5,
            boxShadow: `1px 1px 2px 2px ${dark}`
          }
        }
      }
    }
  };

  return createTheme(themeOptions);
}

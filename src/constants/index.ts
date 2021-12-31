export const THEME_VARS: {
  [key: string]: {
    light: string,
    dark: string
  }
} = {
  'clr-text': {
    light: 'hsl(200,15%,8%)',
    dark: 'hsl(0,0%,100%)'
  },
  'clr-elements': {
    light: 'hsl(0,0%,100%)',
    dark: 'hsl(209, 23%, 22%)'
  },
  'clr-input': {
    light: 'hsl(0,0%,52%)',
    dark: 'hsl(0, 0%, 100%)'
  },
  'clr-bg': {
    light: 'hsl(0,0%,98%)',
    dark: 'hsl(207, 26%, 17%)'
  },
  'clr-link': {
    light: 'hsl(0,0%,98%)',
    dark: 'hsl(209, 23%, 22%)'
  },
  'shadow-color': {
    light: '280deg 6% 76%',
    dark: '0deg 0% 17%'
  },
  'shadow-button': {
    light: '0 0 4px 2px lightgrey',
    dark: '0 0 3px 1px rgba(18, 10, 7, 0.5)'
  }

}

export const INITIAL_COLOR_MODE_CSS_PROP = '--initial-color-mode';

export const COLOR_MODE_KEY = 'color-mode';

export const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useButtonStyles = createUseStyles(
  (theme: Theme) => ({
    button: {
      borderRadius: 16,
      letterSpacing: '-0.02em',
      padding: '11px 40px',
      fontSize: 32,
      lineHeight: '40px'
    },

    primary: {
      backgroundColor: theme.colors.primary,
      border: `1px solid ${theme.colors.primary}`,
      color: theme.colors.secondary,

      '&$outlined': {
        color: theme.colors.primary
      }
    },

    secondary: {},

    contained: {},

    outlined: {
      backgroundColor: 'transparent'
    }
  }),
  {
    name: 'Button'
  }
);

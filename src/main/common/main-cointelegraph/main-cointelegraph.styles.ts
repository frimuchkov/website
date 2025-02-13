import { rgba } from 'polished';
import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useMainCointelegraphStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    card: {
      display: 'block',

      '&:not(:last-child)': {
        marginBottom: 16,

        [theme.breakpoints.md()]: {
          marginBottom: 48
        }
      }
    },

    cardContent: {
      padding: '24px 24px 68px',

      [theme.breakpoints.md()]: {
        padding: '32px 48px 56px'
      }
    },

    cardHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 24,

      [theme.breakpoints.md()]: {
        marginBottom: 16
      }
    },

    cardSite: {
      color: rgba(theme.colors.primary, 0.4)
    },

    cardIcon: {
      width: 32,
      height: 32,
      marginRight: 10,

      [theme.breakpoints.md()]: {
        width: 40,
        height: 40
      }
    },

    cardTitle: {
      marginBottom: 8
    },

    cardSubtitle: {
      color: rgba(theme.colors.primary, 0.4)
    }
  }),
  {
    name: 'MainCointelegraph'
  }
);

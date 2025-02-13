import { createUseStyles } from 'react-jss';
import { Theme } from 'src/common';

export const useMainStakingStyles = createUseStyles(
  (theme: Theme) => ({
    title: {
      maxWidth: 1200,
      margin: '0 auto 64px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 104px'
      }
    },

    subtitle: {
      maxWidth: 790,
      margin: '0 auto 8px'
    },

    stakingList: {
      gridGap: 24,
      marginBottom: 40,

      [theme.breakpoints.md()]: {
        marginBottom: 48,
        display: 'grid',
        gridGap: 48,
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
      },

      [theme.breakpoints.up(1400)]: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      }
    },

    skeleton: {
      minHeight: 360
    },

    totalValueLocked: {
      padding: 16,
      marginBottom: 16,
      borderRadius: 16,

      [theme.breakpoints.md()]: {
        padding: 24,
        marginBottom: 48,
        borderRadius: 24
      }
    },

    howItWorks: {
      width: '100%',
      margin: '0 auto 104px',

      [theme.breakpoints.md()]: {
        margin: '0 auto 200px'
      }
    }
  }),
  {
    name: 'MainStaking'
  }
);

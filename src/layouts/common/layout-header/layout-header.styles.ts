import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useLayoutHeaderStyles = createUseStyles(
  (theme: Theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: '10px 16px',
      justifyContent: 'space-between',

      [theme.breakpoints.lg()]: {
        padding: '16px 32px',
        justifyContent: 'flex-start'
      }
    },

    col: {
      display: 'flex'
    },

    logo: {
      position: 'relative',
      zIndex: 1
    },

    leftButton: {
      justifyContent: 'flex-start',
      flexBasis: '5%',
      order: -1
    },

    center: {
      order: 2,

      [theme.breakpoints.lg()]: {
        flex: 1,
        order: 'unset'
      }
    },

    menu: {
      display: 'none',

      [theme.breakpoints.lg()]: {
        display: 'flex'
      }
    },

    menuOpen: {
      [theme.breakpoints.down(1279)]: {
        display: 'block',
        position: 'fixed',
        width: '100%',
        height: 'calc(100% - 65px)',
        left: 0,
        top: 65,
        bottom: 0,
        backgroundColor: theme.colors.secondary,
        flexWrap: 'nowrap',
        overflowY: 'scroll',
        zIndex: 10,
        padding: '20px 0'
      }
    },

    menuButton: {
      position: 'relative',
      zIndex: 1,

      [theme.breakpoints.lg()]: {
        display: 'none'
      }
    },

    rightButton: {
      justifyContent: 'flex-end',
      flexBasis: '15%',
      order: 1,
      alignItems: 'center',

      [theme.breakpoints.lg()]: {
        order: 'unset'
      }
    }
  }),
  {
    name: 'LayoutHeader'
  }
);

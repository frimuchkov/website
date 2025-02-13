import { createUseStyles } from 'react-jss';

import { Theme } from 'src/common';

export const useStablecoinTableStyles = createUseStyles(
  (theme: Theme) => ({
    root: {},

    title: {
      marginBottom: 48
    },

    headTitle: {
      whiteSpace: 'pre'
    },

    no: {
      color: theme.colors.red
    },

    yes: {
      color: theme.colors.green
    },

    rowGrey: {
      background: theme.colors.proposalPlate
    }
  }),
  {
    name: 'StablecoinTable'
  }
);

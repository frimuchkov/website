import clsx from 'clsx';
import React from 'react';
import { Typography } from 'src/common';

import { useLayoutMenuStyles } from './layout-menu.styles';

const PHASES = [
  {
    title: 'Phase 1: Investment Stage',
    body: 'Stake your crypto or invest in the protocol',
    date: 'Up to 3 months, Started April 5'
  },
  {
    title: 'Phase 2: RWA-collateral',
    body:
      'Purchase the first-ever decentralized stablecoin backed by real-world fixed-income securities',
    date: '1 Day after P1, 2 years'
  },
  {
    title: 'Phase 3: Direct Investment',
    body:
      'The capitalization of the protocol reaches $100m. The issuance of governance tokens stops.',
    date: '1 Day after P2, unlimited'
  }
];

export const LayoutMenuPhasesDropdown: React.FC = () => {
  const classes = useLayoutMenuStyles();

  return (
    <ul className={clsx(classes.dropdown, classes.dropdownPhases)}>
      {PHASES.map((phase) => (
        <li key={phase.title} className={classes.dropdownPhasesItem}>
          <Typography variant="body1" weight="bold">
            {phase.title}
          </Typography>
          <Typography variant="body1">{phase.body}</Typography>
          <Typography
            variant="body1"
            className={classes.dropdownPhasesItemDate}
          >
            {phase.date}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

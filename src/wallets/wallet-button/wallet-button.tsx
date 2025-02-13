import React from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import clsx from 'clsx';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { useToggle } from 'react-use';

import {
  ButtonBase,
  Typography,
  cutAccount,
  Chip,
  useNetworkConfig
} from 'src/common';
import { ReactComponent as WalletIcon } from 'src/assets/icons/wallet.svg';
import { useWalletButtonStyles } from './wallet-button.styles';
import { WalletModal } from '../wallet-modal';

export const WalletButton: React.FC = () => {
  const classes = useWalletButtonStyles();
  const { account } = useWeb3React<Web3>();
  const [open, toggleOpen] = useToggle(false);
  const networkConfig = useNetworkConfig();

  return (
    <div className={classes.wrap}>
      {account &&
        networkConfig.networkName &&
        networkConfig.networkName !== 'mainnet' && (
          <Chip className={classes.chip}>{networkConfig.networkName}</Chip>
        )}
      <ButtonBase onClick={toggleOpen} className={clsx(classes.connected)}>
        <Typography
          variant="body1"
          className={classes.account}
          component="span"
        >
          {account ? cutAccount(account) : <>Connect wallet</>}
        </Typography>
        {account ? (
          <Jazzicon diameter={28} seed={jsNumberForAddress(account)} />
        ) : (
          <WalletIcon className={classes.walletIcon} />
        )}
      </ButtonBase>
      <WalletModal open={open} onClose={toggleOpen} />
    </div>
  );
};

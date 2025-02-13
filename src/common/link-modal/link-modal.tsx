import React from 'react';
import clsx from 'clsx';

import { ReactComponent as UniswapIcon } from 'src/assets/icons/uniswap.svg';
import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { Button } from '../button';
import { Modal } from '../modal';
import { SmallModal } from '../small-modal';
import { Typography } from '../typography';
import { Link } from '../link';
import { useLinkModalStyles } from './link-modal.styles';

export type LinkModalProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
  onBuyCollateralMarket?: () => void;
  onBuyMarket?: () => void;
  onBuyInvestment?: () => void;
  withBuyMarket?: boolean;
  withBuyCollateralMarket?: boolean;
  withBuyInvestment?: boolean;
  tokenAddress: string;
  rewardPercent?: string;
  tokenName: string;
};

const UNISWAP_URL = 'https://info.uniswap.org/token/';

export const LinkModal: React.FC<LinkModalProps> = (props) => {
  const classes = useLinkModalStyles();

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <SmallModal>
        <div className={classes.root}>
          <div className={classes.buttons}>
            {props.withBuyCollateralMarket && (
              <Button
                onClick={props.onBuyCollateralMarket}
                className={classes.button}
              >
                Buy {props.tokenName}
              </Button>
            )}
            {props.withBuyMarket && (
              <Button
                onClick={props.onBuyMarket}
                className={clsx(classes.button, classes.fromProtocol)}
              >
                <Typography
                  variant="inherit"
                  component="span"
                  className={classes.buttonTitle}
                >
                  Buy {props.tokenName}
                </Typography>
                <Typography variant="body1" component="span" align="center">
                  Get extra +{props.rewardPercent}% of your investment as
                  <br />
                  <BAGicon
                    className={classes.bagIcon}
                    height="1em"
                    width="1em"
                  />{' '}
                  BAG reward
                </Typography>
              </Button>
            )}
            {props.withBuyInvestment && (
              <Button
                onClick={props.onBuyInvestment}
                className={clsx(classes.button, classes.fromProtocol)}
              >
                <Typography
                  variant="inherit"
                  component="span"
                  className={classes.buttonTitle}
                >
                  Buy with -50% discount
                </Typography>
                <Typography variant="body1" component="span" align="center">
                  Get{' '}
                  <BAGicon
                    className={classes.bagIcon}
                    height="1em"
                    width="1em"
                  />{' '}
                  BAG at a fixed price $2.5 and
                  <br />a 6-month lockup period.
                </Typography>
              </Button>
            )}
            <Button
              variant="outlined"
              component={Link}
              href={`${UNISWAP_URL}${props.tokenAddress}`}
              target="_blank"
              className={classes.button}
            >
              <UniswapIcon />
              Uniswap
            </Button>
          </div>
        </div>
      </SmallModal>
    </Modal>
  );
};

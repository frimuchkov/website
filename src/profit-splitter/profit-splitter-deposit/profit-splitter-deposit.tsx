import { useFormik } from 'formik';
import React from 'react';
import clsx from 'clsx';
import Web3 from 'web3';
import Tippy from '@tippyjs/react';
import { useWeb3React } from '@web3-react/core';

import {
  Button,
  Input,
  Typography,
  Plate,
  useProfitSplitterContract
} from 'src/common';
import { useSplitterBalance } from '../common';
import { useProfitSplitterDepositStyles } from './profit-splitter-deposit.styles';
import { useSplit } from './use-split';

export type ProfitSplitterDepositProps = {
  className?: string;
};

export const ProfitSplitterDeposit: React.FC<ProfitSplitterDepositProps> = (
  props
) => {
  const classes = useProfitSplitterDepositStyles();

  const { account } = useWeb3React<Web3>();

  const profitSplitterContract = useProfitSplitterContract();

  const { tokenBalance, tokenContract, asset } = useSplitterBalance(
    profitSplitterContract?.methods.incoming,
    profitSplitterContract?.options.address
  );

  const formik = useFormik({
    initialValues: {
      amount: ''
    },

    validate: (formValues) => {
      const errors: { amount?: string } = {};

      if (!formValues.amount) {
        errors.amount = 'Required';
      }

      if (!asset || !tokenBalance) return;

      if (tokenBalance.isLessThan(formValues.amount)) {
        errors.amount = `Looks like you don't have enough ${asset.symbol}, please check your wallet`;
      }

      return errors;
    },

    onSubmit: async (formValues) => {
      if (!tokenContract || !profitSplitterContract || !account) return;

      const transfer = tokenContract.methods.transfer(
        profitSplitterContract.options.address,
        formValues.amount
      );

      await transfer.send({
        from: account,
        gas: await transfer.estimateGas({ from: account })
      });
    }
  });

  const handleSplit = useSplit(tokenBalance?.toString(10));

  return (
    <Plate className={clsx(props.className)}>
      <Typography variant="h3">Deposit</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Tippy
          visible={Boolean(formik.errors.amount)}
          content={formik.errors.amount}
          maxWidth={200}
          offset={[0, 25]}
          className={classes.tooltip}
        >
          <Input
            type="text"
            name="amount"
            label="Amount"
            onChange={formik.handleChange}
          />
        </Tippy>
        <Button type="submit">Deposit</Button>
      </form>
      <div>
        <Typography variant="body1" component="span">
          Balance: {tokenBalance?.toString(10)} {asset?.symbol}
        </Typography>
        <Button onClick={handleSplit}>Split</Button>
      </div>
    </Plate>
  );
};

import React, { useCallback, useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import BN from 'bignumber.js';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import { useToggle } from 'react-use';

import {
  Modal,
  useNetworkConfig,
  useInvestmentContract,
  useGovernanceTokenContract,
  useUSDTContract,
  useDAIContract,
  useUSDCContract,
  useBalance,
  BuyTokenForm,
  BuyTokenFormValues,
  InfoCardFailure,
  InfoCardSuccess,
  FullpageModal,
  InfoCardLoader
} from 'src/common';
import { WalletModal } from 'src/wallets';
import type { Ierc20 } from 'src/generate/IERC20';
import { useInvestingTokens } from './use-investing-tokens';

export type InvestingFormProps = {
  className?: string;
};

export const InvestingForm: React.FC<InvestingFormProps> = (props) => {
  const tokenContracts: Record<string, Ierc20 | null> = {
    USDT: useUSDTContract(),
    DAI: useDAIContract(),
    USDC: useUSDCContract()
  };

  const getBalance = useBalance();
  const { account } = useWeb3React<Web3>();
  const [successOpen, successToggle] = useToggle(false);
  const [failureOpen, failureToggle] = useToggle(false);
  const [transactionOpen, transactionToggle] = useToggle(false);
  const [walletsOpen, walletsToggle] = useToggle(false);
  const [userGet, setUserGet] = useState<BN>(new BN(0));
  const network = useNetworkConfig();
  const investmentContract = useInvestmentContract();
  const tokens = useInvestingTokens();
  const governanceContract = useGovernanceTokenContract();

  const formik = useFormik<BuyTokenFormValues>({
    initialValues: {
      currency: 'USDC',
      amount: '10000'
    },
    validateOnBlur: false,
    validateOnChange: false,

    validate: async (formValues) => {
      const error: Partial<BuyTokenFormValues> = {};

      if (!formValues.currency) {
        error.currency = '';
        return error;
      }

      if (Number(formValues.amount) <= 0) {
        error.amount = 'Required';
        return error;
      }

      const currentToken = tokens[formValues.currency];

      if (!currentToken) return;

      const balanceOfToken = await getBalance({
        tokenAddress: currentToken.address,
        tokenName: currentToken.name
      });

      if (
        balanceOfToken
          .div(new BN(10).pow(currentToken.decimals))
          .isLessThan(formValues.amount)
      ) {
        error.amount = `Looks like you don't have enough ${formValues.currency}, please check your wallet`;
      }

      const bondBalance = await governanceContract.methods
        .balanceOf(investmentContract.options.address)
        .call();

      const governanceBalanceNumber = new BN(bondBalance).div(
        new BN(10).pow(network.assets.Governance.decimals)
      );

      if (governanceBalanceNumber.isLessThan(userGet)) {
        error.amountOfToken = `Looks like we don't have enough Bond`;
      }

      return error;
    },

    onSubmit: async (formValues) => {
      transactionToggle(true);

      const currentToken = tokens[formValues.currency];

      if (!currentToken || !account) return;

      const formInvest = new BN(formValues.amount)
        .multipliedBy(new BN(10).pow(currentToken.decimals))
        .toString(10);

      const currentContract = tokenContracts[currentToken.name];

      try {
        if (currentToken.name === 'WETH') {
          const investETH = investmentContract.methods.investETH();

          await investETH.send({
            from: account,
            value: formInvest,
            gas: 2000000
          });
        } else {
          if (!currentContract) return;

          const invest = investmentContract.methods.invest(
            currentContract.options.address,
            formInvest
          );

          const approve = currentContract.methods.approve(
            investmentContract.options.address,
            formInvest
          );

          const allowance = await currentContract.methods
            .allowance(account, investmentContract.options.address)
            .call();

          if (allowance !== '0') {
            await currentContract.methods
              .approve(investmentContract.options.address, '0')
              .send({
                from: account,
                gas: await approve.estimateGas({ from: account })
              });
          }

          await approve.send({
            from: account,
            gas: await approve.estimateGas({ from: account })
          });
          window.onbeforeunload = () => 'wait please transaction in progress';

          await invest.send({
            from: account,
            gas: 2000000
          });
        }

        failureToggle(false);
        successToggle(true);
      } catch {
        failureToggle(true);
      } finally {
        window.onbeforeunload = () => null;
        transactionToggle(false);
      }
    }
  });

  const handleOpenWalletListModal = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      walletsToggle();
    },
    [walletsToggle]
  );

  const handleSuccessClose = useCallback(() => {
    successToggle(false);
    formik.resetForm();
    setUserGet(new BN(0));
  }, [successToggle, formik]);

  return (
    <>
      <FormikProvider value={formik}>
        <BuyTokenForm
          setUserGet={setUserGet}
          handleOpenWalletListModal={handleOpenWalletListModal}
          className={props.className}
          account={account}
          tokens={tokens}
          userGet={userGet}
          network={network}
        />
      </FormikProvider>
      <Modal open={successOpen} onClose={handleSuccessClose}>
        <FullpageModal>
          <InfoCardSuccess
            tokenName="BAG"
            onClick={handleSuccessClose}
            purchased={userGet.isNaN() ? '0' : userGet.toFixed(2)}
          />
        </FullpageModal>
      </Modal>
      <Modal open={failureOpen} onClose={failureToggle}>
        <FullpageModal>
          <InfoCardFailure onClick={formik.submitForm} />
        </FullpageModal>
      </Modal>
      <Modal open={transactionOpen}>
        <FullpageModal>
          <InfoCardLoader isAnimating={transactionOpen} />
        </FullpageModal>
      </Modal>
      <WalletModal open={walletsOpen} onClose={walletsToggle} />
    </>
  );
};

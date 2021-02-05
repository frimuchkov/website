import { useState, useEffect, useCallback } from 'react';

import { useIssuerContract, useNetworkConfig, BN } from 'src/common';

export const useIssuerBalance = () => {
  const [state, setState] = useState('');
  const issuerContract = useIssuerContract();

  const networkConfig = useNetworkConfig();

  const handleGetIssuerBalance = useCallback(async () => {
    const issuerBalance = await issuerContract.methods.balance().call();

    setState(
      new BN(issuerBalance)
        .div(new BN(10).pow(networkConfig.assets.Stable.decimals))
        .toFormat(2)
    );
  }, [issuerContract, networkConfig]);

  useEffect(() => {
    handleGetIssuerBalance();
  }, [handleGetIssuerBalance]);

  return state;
};

import { useCallback, useEffect, useMemo, useRef } from 'react';
import Web3 from 'web3';
import type { AbiItem } from 'web3-utils';
import type { ContractOptions } from 'web3-eth-contract';
import networks from '@bondappetit/networks';
import { useWeb3React } from '@web3-react/core';

import { useNetworkConfig } from './use-network-config';
import { EthereumNetworkError } from './ethereum-network-error';

type ContractParameters = {
  abi: AbiItem[] | AbiItem;
  address?: string;
  options?: ContractOptions;
};

type Callback = (network: Network) => ContractParameters;

export type Network = typeof networks[keyof typeof networks];

const useLibrary = () => {
  const { library } = useWeb3React<Web3>();
  const networkConfig = useNetworkConfig();
  const providerRef = useRef(new Web3(networkConfig.networkUrl));

  useEffect(() => {
    providerRef.current = new Web3(networkConfig.networkUrl);
  }, [networkConfig.networkUrl]);

  return useMemo(() => library ?? providerRef.current, [library]);
};

export const createUseContract = <T>(cb: Callback) => () => {
  const library = useLibrary();
  const networkConfig = useNetworkConfig();

  return useMemo(() => {
    try {
      const contractParams = cb(networkConfig);

      return (new library.eth.Contract(
        contractParams?.abi,
        contractParams?.address,
        contractParams?.options
      ) as unknown) as T;
    } catch {
      return null;
    }
  }, [library, networkConfig]);
};

export const useDynamicContract = <T>(
  contractParameters?: ContractParameters
) => {
  const library = useLibrary();
  const contract = useRef<T | null>(null);

  const handleGetContract = useCallback(
    (address?: string, abi?: AbiItem[] | AbiItem) => {
      const currentAbi = contractParameters?.abi ?? abi;

      try {
        if (!currentAbi) {
          throw new Error('Abi is required');
        }

        contract.current = (new library.eth.Contract(
          currentAbi,
          address
        ) as unknown) as T;
      } catch {
        throw new EthereumNetworkError();
      }

      return contract.current;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [library]
  );

  return handleGetContract;
};

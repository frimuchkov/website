import IERC20 from '@bondappetit/networks/abi/IERC20.json';
import { abi as GovernanceTokenAbi } from '@bondappetit/networks/abi/GovernanceToken.json';
import type { AbiItem } from 'web3-utils';

import type { Investment } from 'src/generate/Investment';
import type { Market } from 'src/generate/Market';
import type { Ierc20 } from 'src/generate/IERC20';
import type { GovernorAlpha } from 'src/generate/GovernorAlpha';
import type { GovernanceToken } from 'src/generate/GovernanceToken';
import type { IUniswapV2Router02 } from 'src/generate/IUniswapV2Router02';
import type { Issuer } from 'src/generate/Issuer';
import type { Vesting } from 'src/generate/Vesting';
import type { Treasury } from 'src/generate/Treasury';
import type { ProfitSplitter } from 'src/generate/ProfitSplitter';
import type { Budget } from 'src/generate/Budget';
import type { Buyback } from 'src/generate/Buyback';
import type { UniswapMarketMaker } from 'src/generate/UniswapMarketMaker';
import type { CollateralMarket } from 'src/generate/CollateralMarket';
import type { VestingSplitter } from 'src/generate/VestingSplitter';
import type { RealAssetDepositaryBalanceView } from 'src/generate/RealAssetDepositaryBalanceView';
import { createUseContract } from './create-use-contract';

export const useInvestmentContract = createUseContract<Investment>(
  (network) => ({
    abi: network.contracts.Investment.abi,
    address: network.contracts.Investment.address
  })
);

export const useMarketContract = createUseContract<Market>((network) => ({
  abi: network.contracts.Market.abi,
  address: network.contracts.Market.address
}));

export const useUSDTContract = createUseContract<Ierc20>((network) => ({
  abi: IERC20.abi as AbiItem[],
  address: network.assets.USDT.address
}));

export const useDAIContract = createUseContract<Ierc20>((network) => ({
  abi: IERC20.abi as AbiItem[],
  address: network.assets.DAI.address
}));

export const useUSDCContract = createUseContract<Ierc20>((network) => ({
  abi: IERC20.abi as AbiItem[],
  address: network.assets.USDC.address
}));

export const useGovernanceTokenContract = createUseContract<Ierc20>(
  (network) => ({
    abi: IERC20.abi as AbiItem[],
    address: network.assets.Governance.address
  })
);

export const useStableCoinContract = createUseContract<Ierc20>((network) => ({
  abi: IERC20.abi as AbiItem[],
  address: network.assets.Stable.address
}));

export const useGovernorContract = createUseContract<GovernorAlpha>(
  (network) => ({
    abi: network.contracts.GovernorAlpha.abi,
    address: network.contracts.GovernorAlpha.address
  })
);

export const useGovernanceContract = createUseContract<GovernanceToken>(
  (network) => ({
    abi: GovernanceTokenAbi as AbiItem[],
    address: network.assets.Governance.address
  })
);

export const useUniswapRouter = createUseContract<IUniswapV2Router02>(
  (network) => ({
    abi: network.contracts.UniswapV2Router02.abi,
    address: network.contracts.UniswapV2Router02.address
  })
);

export const useIssuerContract = createUseContract<Issuer>((network) => ({
  abi: network.contracts.Issuer.abi,
  address: network.contracts.Issuer.address
}));

export const useVestingContract = createUseContract<Vesting>((network) => ({
  abi: network.contracts.Vesting.abi,
  address: network.contracts.Vesting.address
}));

export const useTreasuryContract = createUseContract<Treasury>((network) => ({
  abi: network.contracts.Treasury.abi,
  address: network.contracts.Treasury.address
}));

export const useProfitSplitterContract = createUseContract<ProfitSplitter>(
  (network) => ({
    abi: network.contracts.ProfitSplitter.abi,
    address: network.contracts.ProfitSplitter.address
  })
);

export const useBuybackContract = createUseContract<Buyback>((network) => ({
  abi: network.contracts.Buyback.abi,
  address: network.contracts.Buyback.address
}));

export const useBudgetContract = createUseContract<Budget>((network) => ({
  abi: network.contracts.Budget.abi,
  address: network.contracts.Budget.address
}));

export const useUniswapMarketMakerContract = createUseContract<
  UniswapMarketMaker
>((network) => ({
  abi: network.contracts.UniswapMarketMaker.abi,
  address: network.contracts.UniswapMarketMaker.address
}));

export const useCollateralMarketContract = createUseContract<CollateralMarket>(
  (network) => ({
    abi: network.contracts.CollateralMarket.abi,
    address: network.contracts.CollateralMarket.address
  })
);

export const useVestingSplitterContract = createUseContract<VestingSplitter>(
  (network) => ({
    abi: network.contracts.VestingSplitter.abi,
    address: network.contracts.VestingSplitter.address
  })
);

export const useRealAssetDepositaryBalanceView = createUseContract<
  RealAssetDepositaryBalanceView
>((network) => ({
  abi: network.contracts.RealAssetDepositaryBalanceView.abi,
  address: network.contracts.RealAssetDepositaryBalanceView.address
}));

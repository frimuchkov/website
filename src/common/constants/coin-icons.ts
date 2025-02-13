import { ReactComponent as BAGicon } from 'src/assets/icons/coins/bag.svg';
import { ReactComponent as USDCicon } from 'src/assets/icons/coins/usdc.svg';
import { ReactComponent as USDapicon } from 'src/assets/icons/coins/usdap.svg';
import { ReactComponent as DaiIcon } from 'src/assets/icons/coins/dai.svg';
import { ReactComponent as UsdtIcon } from 'src/assets/icons/coins/usdt.svg';
import { ReactComponent as BtcIcon } from 'src/assets/icons/coins/btc.svg';
import { ReactComponent as EthIcon } from 'src/assets/icons/coins/eth.svg';
import { ReactComponent as USDNIcon } from 'src/assets/icons/coins/usdn.svg';

export const COIN_ICONS = new Map<string, typeof BAGicon>([
  ['BAG', BAGicon],
  ['USDap', USDapicon],
  ['DAI', DaiIcon],
  ['WBTC', BtcIcon],
  ['ETH', EthIcon],
  ['USDT', UsdtIcon],
  ['USDC', USDCicon],
  ['USDN', USDNIcon]
]);

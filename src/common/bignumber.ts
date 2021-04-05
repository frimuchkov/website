import BN from 'bignumber.js';

BN.set({
  FORMAT: {
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0
  }
});

function humanizeNumeral(value: string | number | undefined | null | BN) {
  if (value === undefined || value === null) return '0';

  const result = BN.isBigNumber(value) ? value : new BN(value);

  if (result.isNaN() || !result.isFinite() || result.eq(0)) return '0';

  if (result.lt(10)) return result.toFormat(2);

  if (result.lt(10000)) return result.toFormat(2);

  if (result.lt(100000)) return result.toFormat(2);

  if (result.lt(1000000)) return result.toFormat(2);

  if (result.isGreaterThanOrEqualTo(1000000000))
    return `${result.div(1000000000).toFormat(2)}B`;

  return `${result.div(1000000).toFormat(2)}M`;
}

export { BN, humanizeNumeral };

import calculateOutputs from '../../util/calculations';

describe('calculateOutputs', () => {
  it('calculates all the outputs correctly', () => {
    const listingPrice = 450000;
    const discountVsAskingPrice = 15;
    const desiredYield = 5;
    const convertedRentRate = 20;
    const duration = 5;

    const expected = {
      targetPrice: 382500,
      rent: 6375,
      convertedRent: 318.75,
      totalMonthlyRent: 6693.75,
      futureBuyBackPrice: 363375
    };

    expect(calculateOutputs(listingPrice, discountVsAskingPrice, desiredYield, convertedRentRate, duration)).toStrictEqual(expected);
  });
});
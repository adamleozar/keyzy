export type Outputs = {
  targetPrice: number,
  rent: number,
  convertedRent: number,
  totalMonthlyRent: number,
  futureBuyBackPrice: number
};

const calculateTargetPrice = (listingPrice: number, discountVsAskingPrice: number) => {
  return (listingPrice * (1 - (discountVsAskingPrice/100)))
}

const calculateRent = (targetPrice: number, desiredYield: number) => {
  return (targetPrice / (12 * desiredYield))
}

const calculateConvertedRent = (targetPrice: number, desiredYield: number, convertedRentRate: number) => {
  return (targetPrice / (12 * desiredYield * convertedRentRate))
}

const calculateFutureBuyBackPrice = (targetPrice: number, convertedRent: number, duration: number) => {
  return (targetPrice - (convertedRent * duration * 12))
}

const calculateOutputs = (listingPrice: number, discountVsAskingPrice: number, desiredYield: number, convertedRentRate: number, duration: number): Outputs => {
  const targetPrice = calculateTargetPrice(listingPrice, discountVsAskingPrice);
  const rent = calculateRent(targetPrice, desiredYield);
  const convertedRent = calculateConvertedRent(targetPrice, desiredYield, convertedRentRate);
  const totalMonthlyRent = rent + convertedRent;
  const futureBuyBackPrice = calculateFutureBuyBackPrice(targetPrice, convertedRent, duration);

  return {
    targetPrice: targetPrice,
    rent: rent,
    convertedRent: convertedRent,
    totalMonthlyRent: totalMonthlyRent,
    futureBuyBackPrice: futureBuyBackPrice
  };

}

export default calculateOutputs;
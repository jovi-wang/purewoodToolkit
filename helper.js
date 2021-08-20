// generate new pieces and m3 value
export const getTotalValue = (pcsList, coefficientList) => {
  const reducer = (accumulator, currentValue, index) => ({
    pieces: accumulator.pieces + currentValue,
    m3: accumulator.m3 + currentValue * coefficientList[index],
  });
  return pcsList.reduce(reducer, {pieces: 0, m3: 0});
};

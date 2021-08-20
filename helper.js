// generate new pieces and m3 value
export const getTotalValue = (pcsList, coefficientList) => {
  const reducer = (accumulator, currentValue, index) => ({
    pieces: accumulator.pieces + pcsList[index],
    m3: accumulator.m3 + currentValue * pcsList[index],
  });
  return coefficientList.reduce(reducer, {pieces: 0, m3: 0});
};

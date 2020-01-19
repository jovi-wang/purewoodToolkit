// import moment from 'moment-timezone';
import {coefficientList} from './constant';

// generate new pieces and m3 value
export const getTotalValue = (pcsList, lengthType) => {
  const reducer = (accumulator, currentValue, index) => ({
    pieces: accumulator.pieces + currentValue,
    m3: accumulator.m3 + currentValue * coefficientList[lengthType][index],
  });
  return pcsList.reduce(reducer, {pieces: 0, m3: 0});
};

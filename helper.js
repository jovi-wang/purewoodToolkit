// import moment from 'moment-timezone';
import {diameterLength, diameterOffset} from './constant';

// generate new pieces and m3 value
export const getTotalValue = (pcsList, coefficientList) => {
  const reducer = (accumulator, currentValue, index) => ({
    pieces: accumulator.pieces + currentValue,
    m3: accumulator.m3 + currentValue * coefficientList[index],
  });
  return pcsList.reduce(reducer, {pieces: 0, m3: 0});
};

// calculate coefficient based on diameter and invoice length
// diameter is find based on length and offset
export const calculateOtherLengthCoefficient = invoiceLength => {
  const array = [];
  for (let i = 0; i < diameterLength; i++) {
    const diameter = diameterOffset + i;
    array.push(
      (diameter *
        diameter *
        invoiceLength *
        (0.07995 + 0.00016105 * invoiceLength) +
        0.04948 * invoiceLength * invoiceLength) /
        10000,
    );
  }
  return array;
};

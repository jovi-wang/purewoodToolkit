export const diameterLength = 25;
export const diameterOffset = 23;
export const pcsValueLimit = {MAX: 500, MIN: 0};
export const coefficientList = [
  new Array(diameterLength).fill(0),
  //'1.8m',
  [
    0.4777981,
    0.520249,
    0.5645063,
    0.61057,
    0.6584401,
    0.7081166,
    0.7595996,
    0.812889,
    0.8679848,
    0.924887,
    0.9835957,
    1.0441108,
    1.1064323,
    1.1705602,
    1.2364945,
    1.3042352,
    1.3737824,
    1.445136,
    1.518296,
    1.5932624,
    1.6700353,
    1.7486146,
    1.8290003,
    1.9111924,
    1.9951909,
  ],
];

export const LANGUAGE = {
  CONTAINER_NAME: 'Container Name',
  CONTAINER_NAME_PLACEHOLDER: 'Please enter container name',
  LENGTH: 'Length',
  LENGTH_PLACEHOLDER: 'Please select length',
  OTHER_LENGTH: 'other length',
  OTHER_LENGTH_INVOICE: 'other length with invoice',
  OTHER_LENGTH_INVOICE_VALUE_RANGE: 'invoice value is from 1 to 15',
  TOTAL_PIECES: 'Total PCS',
  TOTAL_M3: 'Total m3',
  DIAMETER: 'Diameter',
  PCS: 'PCS',
  COEFFICIENT: 'm3/PCS',
  RESET_ALL: 'Reset All',
  OK: 'OK',
  ENTER_INVOICE_INPUT_LABEL: 'Please enter invoice value',
  ENTER_CONTAINER_NAME_FIRST: 'Please enter container name first',
  SELECT_LENGTH_FIRST: 'Please select length first',
  INTERNAL_ERROR:
    'Opps! Something went wrong, please contact the author to resolve this issue.',
};
export const lengthTypeList = [
  LANGUAGE.LENGTH_PLACEHOLDER,
  'German 11.8m Spruce',
];
// common action types
export const COMMON = {
  DISPLAY_ERROR: 'DISPLAY_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  DISPLAY_INVOICE_INPUT_DIALOG: 'DISPLAY_INVOICE_INPUT_DIALOG',
  CLEAR_INVOICE_INPUT_DIALOG: 'CLEAR_INVOICE_INPUT_DIALOG',
  DISPLAY_PICKER_DIALOG: 'DISPLAY_PICKER_DIALOG',
  CLEAR_PICKER_DIALOG: 'CLEAR_PICKER_DIALOG',
  RESET_ALL: 'RESET_ALL',
};
// container action types
export const CONTAINER = {
  CHANGE_PCS: 'CHANGE_PCS',
  CHANGE_LENGTH_TYPE: 'CHANGE_LENGTH_TYPE',
  CHANGE_OTHER_LENGTH_INVOICE_VALUE: 'CHANGE_OTHER_LENGTH_INVOICE_VALUE',
  CALCULATE_OTHER_LENGTH_COEFFICIENT: 'CALCULATE_OTHER_LENGTH_COEFFICIENT',
};

import {COMMON, CONTAINER, diameterLength} from './constant';
import {getTotalValue, calculateOtherLengthCoefficient} from './helper';
import {coefficientList} from './constant';

const commonInitialState = {
  // loading: false,
  showInvoiceInputDialog: false,
  error: '',
  showPicker: false,
};

const containerInitialState = {
  lengthType: 0,
  pieces: 0,
  m3: 0,
  otherLengthInvoice: '',
  pcsList: new Array(diameterLength).fill(0),
  otherLengthCoefficient: new Array(diameterLength).fill(0),
};

export const commonReducer = (state = commonInitialState, action) => {
  const {
    DISPLAY_ERROR,
    CLEAR_ERROR,
    DISPLAY_PICKER_DIALOG,
    CLEAR_PICKER_DIALOG,
    RESET_ALL,
    DISPLAY_INVOICE_INPUT_DIALOG,
    CLEAR_INVOICE_INPUT_DIALOG,
  } = COMMON;
  switch (action.type) {
    case DISPLAY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: '',
      };
    case DISPLAY_INVOICE_INPUT_DIALOG:
      return {
        ...state,
        showInvoiceInputDialog: true,
      };
    case CLEAR_INVOICE_INPUT_DIALOG:
      return {
        ...state,
        showInvoiceInputDialog: false,
      };
    case DISPLAY_PICKER_DIALOG:
      return {
        ...state,
        showPicker: true,
      };
    case CLEAR_PICKER_DIALOG:
      return {
        ...state,
        showPicker: false,
      };
    case RESET_ALL:
      return {
        ...commonInitialState,
      };
    default:
      return state;
  }
};

export const containerReducer = (state = containerInitialState, action) => {
  const {
    CHANGE_PCS,
    CHANGE_LENGTH_TYPE,
    CHANGE_OTHER_LENGTH_INVOICE_VALUE,
    CALCULATE_OTHER_LENGTH_COEFFICIENT,
  } = CONTAINER;
  const {RESET_ALL} = COMMON;
  let temp;
  let total;
  let currentCoefficient;
  switch (action.type) {
    case CHANGE_PCS:
      // plus 1 or minus 1 to the indexed value and change pcsList
      temp = state.pcsList.map((item, itemIndex) => {
        const {index, value} = action.payload;
        if (itemIndex === index) {
          return item + value;
        }
        return item;
      });
      // before call getTotalValue helper, decide which coefficientList to use based on if initial value is changed
      // use calculated coefficient if state.lengthType===0
      // use constant coefficient if state.lengthType!==0
      currentCoefficient =
        state.otherLengthInvoice === ''
          ? coefficientList[state.lengthType]
          : state.otherLengthCoefficient;

      total = getTotalValue(temp, currentCoefficient);
      return {
        ...state,
        pieces: total.pieces,
        m3: Math.round(total.m3 * 100) / 100,
        pcsList: temp,
      };
    case CHANGE_LENGTH_TYPE:
      currentCoefficient = coefficientList[action.payload];
      total = getTotalValue(state.pcsList, currentCoefficient);
      return {
        ...state,
        m3: Math.round(total.m3 * 100) / 100,
        lengthType: action.payload,
      };
    case CALCULATE_OTHER_LENGTH_COEFFICIENT:
      currentCoefficient = calculateOtherLengthCoefficient(
        10 * parseFloat(action.payload),
      );
      total = getTotalValue(state.pcsList, currentCoefficient);
      return {
        ...state,
        otherLengthCoefficient: currentCoefficient,
        m3: Math.round(total.m3 * 100) / 100,
      };
    case CHANGE_OTHER_LENGTH_INVOICE_VALUE:
      return {
        ...state,
        otherLengthInvoice: action.payload,
      };
    case RESET_ALL:
      return {
        ...containerInitialState,
      };
    default:
      return state;
  }
};

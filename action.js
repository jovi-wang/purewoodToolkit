import {COMMON, CONTAINER} from './constant';

export const changePCSValue = (index, value) => {
  return {
    type: CONTAINER.CHANGE_PCS,
    payload: {index, value},
  };
};

export const changeLengthType = type => {
  return {
    type: CONTAINER.CHANGE_LENGTH_TYPE,
    payload: type,
  };
};
export const changeOtherLengthInvoiceValue = text => {
  return {
    type: CONTAINER.CHANGE_OTHER_LENGTH_INVOICE_VALUE,
    payload: text,
  };
};
// Common action functions
export const displayError = errorMessage => {
  return {
    type: COMMON.DISPLAY_ERROR,
    payload: errorMessage,
  };
};
export const clearError = () => {
  return {
    type: COMMON.CLEAR_ERROR,
  };
};
export const displayLengthTypePicker = () => {
  return {
    type: COMMON.DISPLAY_PICKER_DIALOG,
  };
};
export const clearLengthTypePicker = () => {
  return {
    type: COMMON.CLEAR_PICKER_DIALOG,
  };
};
export const displayInvoiceInputDialog = () => {
  return {
    type: COMMON.DISPLAY_INVOICE_INPUT_DIALOG,
  };
};
export const clearInvoiceInputDialog = () => {
  return {
    type: COMMON.CLEAR_INVOICE_INPUT_DIALOG,
  };
};
export const resetAll = () => {
  return {
    type: COMMON.RESET_ALL,
  };
};

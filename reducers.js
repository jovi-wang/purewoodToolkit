import { COMMON, CONTAINER, diameterLength } from './constant';
import { getTotalValue } from './helper';

const commonInitialState = {
  // loading: false,
  error: '',
  showPicker: false
};

const containerInitialState = {
  // name: '',
  // openTime: '',
  // startTime: '',
  // endTime: '',
  // yard: '',
  // tare: '',
  lengthType: 0,
  pieces: 0,
  m3: 0,
  pcsList: new Array(diameterLength).fill(0)
};

export const commonReducer = (state = commonInitialState, action) => {
  const { DISPLAY_ERROR, CLEAR_ERROR, DISPLAY_PICKER_DIALOG, CLEAR_PICKER_DIALOG, RESET_ALL } = COMMON;
  switch (action.type) {
    case DISPLAY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };
    // case DISPLAY_LOADING:
    //   return {
    //     ...state,
    //     loading: true
    //   };
    // case CLEAR_LOADING:
    //   return {
    //     ...state,
    //     loading: false
    //   };
    case DISPLAY_PICKER_DIALOG:
      return {
        ...state,
        showPicker: true
      };
    case CLEAR_PICKER_DIALOG:
      return {
        ...state,
        showPicker: false
      };
    case RESET_ALL:
      return {
        ...commonInitialState
      };
    default:
      return state;
  }
};

export const containerReducer = (state = containerInitialState, action) => {
  const { CHANGE_PCS, CHANGE_LENGTH_TYPE } = CONTAINER;
  const { RESET_ALL } = COMMON;
  let temp;
  let total;
  switch (action.type) {
    // case CHANGE_NAME:
    //   return {
    //     ...state,
    //     name: action.payload
    //   };
    // case CHANGE_YARD:
    //   return {
    //     ...state,
    //     yard: action.payload
    //   };
    // case CHANGE_TARE:
    //   return {
    //     ...state,
    //     tare: action.payload
    //   };
    case CHANGE_PCS:
      // plus 1 or minus 1 to the indexed value and change pcsList
      temp = state.pcsList.map((item, itemIndex) => {
        const { index, value } = action.payload;
        if (itemIndex === index) {
          return item + value;
        }
        return item;
      });
      // change pieces and m3 values
      total = getTotalValue(temp, state.lengthType);
      return {
        ...state,
        pieces: total.pieces,
        m3: Math.round(total.m3 * 100) / 100,
        pcsList: temp
      };
    case CHANGE_LENGTH_TYPE:
      // change pieces and m3 values
      total = getTotalValue(state.pcsList, action.payload);
      return {
        ...state,
        m3: Math.round(total.m3 * 100) / 100,
        lengthType: action.payload
      };
    // case SET_OPEN_TIME:
    //   return {
    //     ...state,
    //     openTime: action.payload
    //   };
    // case SET_START_TIME:
    //   return {
    //     ...state,
    //     startTime: action.payload
    //   };
    // case SET_END_TIME:
    //   return {
    //     ...state,
    //     endTime: action.payload
    //   };
    case RESET_ALL:
      return {
        ...containerInitialState
      };
    default:
      return state;
  }
};

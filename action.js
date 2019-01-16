
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { COMMON, CONTAINER, LANGUAGE } from './constant';
import { getCurrentTime, generateHTML } from './helper';

const DownloadFolder = RNFS.ExternalStorageDirectoryPath + '/Download';

// Container action functions
export const changeTextInputValue = (inputName, value) => {
  return {
    type: inputName,
    payload: value
  }
};

export const changePCSValue = (index, value) => {
    return {
      type: CONTAINER.CHANGE_PCS,
      payload: { index, value }
    }
};

export const changeLengthType = (type) => {
    return {
        type: CONTAINER.CHANGE_LENGTH_TYPE,
        payload: type
    }
};
export const setTimeValue = (timeType) => {
  return {
    type: timeType,
    payload: getCurrentTime()
  };
};

// Common action functions
export const displayError = errorMessage => {
    return {
      type: COMMON.DISPLAY_ERROR,
      payload: errorMessage
    }
};
export const clearError = () => {
  return {
    type: COMMON.CLEAR_ERROR
  }
};

export const displayLoading = () => {
  return {
    type: COMMON.DISPLAY_LOADING 
  };
};
export const clearLoading = () => {
  return {
    type: COMMON.CLEAR_LOADING 
  };
};

export const displayLengthTypePicker = () => {
  return {
    type: COMMON.DISPLAY_PICKER_DIALOG 
  };
};
export const clearLengthTypePicker = () => {
  return {
    type: COMMON.CLEAR_PICKER_DIALOG 
  };
};

export const resetAll = () => {
  return {
    type: COMMON.RESET_ALL
  };
}
// Async actions
export const resetExport = (props) => {
  const { name, openTime } = props;
  return async (dispatch) => {
    try{
      dispatch(displayLoading());
      dispatch(setTimeValue(CONTAINER.SET_END_TIME));
      const destinationFilePath = `${DownloadFolder}/${openTime.date}`;
      if (!await RNFS.exists(destinationFilePath)) {
        await RNFS.mkdir(destinationFilePath);
      }
      const result =  await RNFS.readDir(destinationFilePath);
      const fileList = result.filter(file=>file.name.includes(name));
      const version = fileList.length + 1;
      const fileName = version>1? `${destinationFilePath}/${name} version${version}.pdf` : `${destinationFilePath}/${name}.pdf`
      let options = {
        html: generateHTML(props),
        fileName: 'temp',
        base64: true
      };
      const temp = await RNHTMLtoPDF.convert(options);
      await RNFS.writeFile(fileName, temp.base64, 'base64');
              // clear cache file in /data/user/0/com.purewoodtoolkit/cache
      await RNFS.unlink(temp.filePath);
      dispatch(resetAll());
      dispatch(setTimeValue(CONTAINER.SET_OPEN_TIME));
        
    } catch(err){
      console.log('error in export action', err);
      dispatch(clearLoading());
      dispatch(displayError(LANGUAGE.INTERNAL_ERROR));
    }

  }
  
};



import {Dimensions, StyleSheet} from 'react-native';

const totalWidth =
  Math.min(Dimensions.get('window').width, Dimensions.get('window').height) - 6;
const buttonWidth = Math.floor(totalWidth * 0.12);

const borderWidthValue = 2;

export const cellWidthLeft = Math.floor(totalWidth * 0.23);
export const cellWidthMiddle = Math.floor(totalWidth * 0.43);
export const cellWidthRight = Math.floor(totalWidth * 0.34);

export default fontSizeValue => {
  return StyleSheet.create({
    flexRow: {
      flexDirection: 'row',
    },
    flexColum: {
      flexDirection: 'column',
    },
    flexOne: {
      flex: 1,
    },
    noPadding: {
      padding: 0,
    },
    normalText: {
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'black',
      fontSize: fontSizeValue,
    },
    normalTextFontBold: {
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: 'black',
      fontSize: fontSizeValue,
    },
    borderAll: {
      borderColor: 'black',
      borderWidth: borderWidthValue,
    },
    borderRight: {
      borderColor: 'black',
      borderRightWidth: borderWidthValue,
    },
    borderBottom: {
      borderColor: 'black',
      borderBottomWidth: borderWidthValue,
    },
    borderHorizontal: {
      borderColor: 'black',
      borderRightWidth: borderWidthValue,
      borderLeftWidth: borderWidthValue,
    },
    // in PCSListItem only
    buttonTextStyle: {
      fontSize: 26,
      width: buttonWidth,
      fontWeight: 'bold',
      color: '#ffffff',
    },
    // in containerScreen only
    resetButtonStyle: {
      width: totalWidth / 3,
      fontSize: fontSizeValue + 8,
      borderWidth: 2,
      borderColor: '#D0021B',
      borderRadius: 8,
      color: '#D0021B',
    },
  });
};

import {Dimensions, StyleSheet} from 'react-native';

const totalWidth =
  Math.min(Dimensions.get('window').width, Dimensions.get('window').height) - 6;
const buttonWidth = Math.floor(totalWidth * 0.12);

const cellWidthLeft = Math.floor(totalWidth * 0.23);
const cellWidthMiddle = Math.floor(totalWidth * 0.43);
const cellWidthRight = Math.floor(totalWidth * 0.34);

const normalText = {
  textAlign: 'center',
  textAlignVertical: 'center',
  color: 'black',
};
const normalTextBold = {
  ...normalText,
  fontWeight: 'bold',
};

export const mainStyles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingHorizontal: 2,
    backgroundColor: 'white',
  },
  totalPcsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'khaki',
  },
  totalLeftText: {
    fontSize: 15,
    width: cellWidthLeft,
    ...normalTextBold,
  },
  totalRightText: {
    fontSize: 16,
    flex: 1,
    ...normalTextBold,
    color: 'red',
    borderLeftWidth: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  diameterHeader: {
    ...normalTextBold,
    fontSize: 15,
    width: cellWidthLeft,
    padding: 2,
    backgroundColor: 'royalblue',
  },
  pcsHeader: {
    ...normalTextBold,
    fontSize: 15,
    width: cellWidthMiddle,
    padding: 2,
    backgroundColor: 'dodgerblue',
  },
  coefficientHeader: {
    ...normalTextBold,
    fontSize: 15,
    width: cellWidthRight,
    padding: 2,
    backgroundColor: 'deepskyblue',
  },
  lengthType: {
    ...normalText,
    fontSize: 18,
  },
  resetContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 4,
  },
  reset: {
    ...normalText,
    width: totalWidth / 3,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'orangered',
    borderRadius: 8,
    // color override original normalText color
    color: 'orangered',
  },
});
export const listItemStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 42,
    marginHorizontal: 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  diameter: {
    width: cellWidthLeft,
    fontSize: 22,
    ...normalTextBold,
    backgroundColor: 'darksalmon',
  },
  pcs: {
    flexDirection: 'row',
    width: cellWidthMiddle,
    justifyContent: 'space-between',
  },
  signBackgroundColor: {backgroundColor: 'cornsilk'},
  signText: {
    width: buttonWidth,
    fontSize: 26,
    ...normalTextBold,
  },
  input: {
    textAlign: 'center',
    color: 'black',
    fontSize: 22,
    padding: 0,
  },
  coefficient: {
    width: cellWidthRight,
    fontSize: 22,
    ...normalText,
    backgroundColor: 'lightcyan',
  },
});

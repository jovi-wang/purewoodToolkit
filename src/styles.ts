import {StyleSheet, TextStyle} from 'react-native';

const normalText: TextStyle = {
  textAlign: 'center',
  textAlignVertical: 'center',
  color: 'black',
};
const normalTextBold: TextStyle = {
  ...normalText,
  fontWeight: 'bold',
};

export const mainScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 2,
    paddingHorizontal: 2,
    backgroundColor: 'white',
  },
  totalPcsContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'lavenderblush',
  },
  totalLeftText: {
    fontSize: 15,
    flex: 23,
    ...normalTextBold,
    borderRightWidth: 1,
  },
  totalRightText: {
    fontSize: 16,
    flex: 77,
    ...normalTextBold,
    color: 'darkviolet',
  },
  headerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'burlywood',
  },
  diameterHeader: {
    ...normalTextBold,
    fontSize: 15,
    flex: 23,
    borderRightWidth: 1,
  },
  pcsHeader: {
    ...normalTextBold,
    fontSize: 15,
    flex: 43,
    borderRightWidth: 1,
  },
  coefficientHeader: {
    ...normalTextBold,
    fontSize: 15,
    flex: 34,
  },
  lengthType: {
    ...normalText,
    fontSize: 18,
    paddingVertical: 4,
  },
  resetContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 4,
  },
  reset: {
    ...normalText,
    paddingHorizontal: 16,
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
    borderColor: 'black',
    borderWidth: 1,
  },
  diameter: {
    flex: 23,
    fontSize: 23,
    ...normalTextBold,
    backgroundColor: 'lemonchiffon',
  },
  pcs: {
    flexDirection: 'row',
    flex: 43,
    justifyContent: 'space-between',
  },
  signBackgroundColor: {backgroundColor: 'darkseagreen'},
  signText: {
    // color: 'white',
    paddingHorizontal: 8,
    fontSize: 26,
    ...normalTextBold,
  },
  input: {
    textAlignVertical: 'center',
    textAlign: 'center',
    color: 'black',
    flex: 1,
    fontSize: 22,
    padding: 0,
  },
  coefficient: {
    flex: 34,
    fontSize: 22,
    ...normalText,
  },
});

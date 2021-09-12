import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {typeList} from './constant';
import {mainScreenStyles as styles} from './styles';

interface IProps {
  totalPieces: number;
  totalM3: number;
  type: number;
  showPicker: Function;
}
const Header: React.FC<IProps> = ({totalPieces, totalM3, type, showPicker}) => {
  return (
    <>
      <TouchableOpacity onPress={() => showPicker()}>
        <Text style={styles.lengthType} numberOfLines={1} ellipsizeMode="tail">
          {`(SPRUCE) ${typeList[type]}`}
        </Text>
      </TouchableOpacity>
      <View style={styles.totalPcsContainer}>
        <Text style={styles.totalLeftText}>Total PCS</Text>
        <Text style={styles.totalRightText}>{totalPieces}</Text>
      </View>
      <View style={styles.totalPcsContainer}>
        <Text style={styles.totalLeftText}>Total m3</Text>
        <Text style={styles.totalRightText}>{totalM3.toFixed(3)}</Text>
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.diameterHeader}>Diameter</Text>
        <Text style={styles.pcsHeader}>PCS</Text>
        <Text style={styles.coefficientHeader}>m3/PCS</Text>
      </View>
    </>
  );
};
export default Header;

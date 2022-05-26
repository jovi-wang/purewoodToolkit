import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {diameterOffset, coefficientList} from './constant';
interface IPros {
  pcsValue: number;
  type: number;
  id: number;
  changePCSValue: Function;
  getRef: Function;
  onNext: Function;
}
import {listItemStyles as styles} from './styles';

const ListItem: React.FC<IPros> = ({
  pcsValue,
  id,
  type,
  changePCSValue,
  getRef,
  onNext,
}) => {
  const onPressAdd = () => {
    if (type === 0) {
      return;
    }
    if (pcsValue < 500) {
      changePCSValue(id, 1);
    }
  };
  const onPressMinus = () => {
    if (type === 0) {
      return;
    }
    if (pcsValue > 0) {
      changePCSValue(id, -1);
    }
  };
  const onChangePCSInput = (text: string) => {
    console.log(text);
    if (type === 0) {
      return;
    }
    const value = Number(text);
    // if input is invalid, do not change value
    if (Number.isNaN(value)) {
      return;
    }

    if (value >= 0 && value <= 500) {
      changePCSValue(id, value - pcsValue);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.diameter}>{String(id + diameterOffset)}</Text>
      <View style={styles.pcs}>
        <TouchableOpacity
          style={styles.signBackgroundColor}
          onPress={onPressMinus}>
          <Text style={styles.signText}>{'−'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={value => onChangePCSInput(value)}
          value={String(pcsValue)}
          keyboardType="numeric"
          ref={ref => getRef(ref, id)}
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => onNext(id)}
        />
        <TouchableOpacity
          style={styles.signBackgroundColor}
          onPress={onPressAdd}>
          <Text style={styles.signText}>{'+'}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.coefficient}>
        {coefficientList[type][id] > 0
          ? coefficientList[type][id].toFixed(3)
          : ''}
      </Text>
    </View>
  );
};
export default ListItem;

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import Dialog from 'react-native-dialog';
import {coefficientList, diameterLength, typeList} from './constant';
import Header from './Header';
import ListItem from './ListItem';
import {mainScreenStyles as styles} from './styles';

interface IItem {
  pcsValue: number;
  type: number;
  id: number;
}
const App = () => {
  // textInputRefList array is used for getting individual textInput reference, to move focus to next input
  // the idea is in parent method, pass 2 callback functions
  // first is getRef (get all item's textInput ref)
  // second is onNext (use the textInput reference and call focus to move the cursor focus)
  const textInputRefList: TextInput[] = [];
  const onNext = (currentIndex: number) => {
    const nextIndex = Number(currentIndex) + 1;
    const currentRef = textInputRefList[currentIndex];
    const nextRef = textInputRefList[nextIndex];
    if (nextRef && nextRef.focus) {
      nextRef.focus();
    } else if (currentRef.blur) {
      currentRef.blur();
    }
  };
  const [type, setType] = useState<number>(0);
  const [showPicker, setShowPicker] = useState(false);
  const [totalPieces, setTotalPieces] = useState<number>(0);
  const [totalM3, setTotalM3] = useState<number>(0);
  const [pcsList, setPcsList] = useState<number[]>(
    new Array(diameterLength).fill(0),
  );
  const [listData, setListData] = useState<IItem[]>([]);
  const changePieces = (index: number, value: number) => {
    setPcsList(prevState => {
      // plus 1 or minus 1 to the indexed value and change pcsList
      const temp = prevState.map((item, itemIndex) => {
        if (itemIndex === index) {
          return item + value;
        }
        return item;
      });
      return [...temp];
    });
  };
  useEffect(() => {
    let sum_m3 = 0;
    let sum_pieces = 0;
    const data: IItem[] = [];
    pcsList.forEach((value, index) => {
      // generate flatList data
      data.push({
        id: index,
        pcsValue: value,
        type,
      });
      // calculate totalM3 and totalPieces
      sum_pieces += value;
      sum_m3 += value * coefficientList[type][index];
    });
    setListData(data);
    setTotalPieces(sum_pieces);
    setTotalM3(sum_m3);
  }, [type, pcsList]);

  const renderItem = ({item}: {item: IItem}) => (
    <ListItem
      id={item.id}
      pcsValue={item.pcsValue}
      type={item.type}
      changePCSValue={changePieces}
      onNext={(id: number) => onNext(id)}
      getRef={(ref: TextInput, id: number) => {
        textInputRefList[id] = ref;
      }}
    />
  );

  const ResetButton = () => {
    return (
      <View style={styles.resetContainer}>
        <TouchableOpacity
          onPress={() => {
            setPcsList(new Array(diameterLength).fill(0));
          }}>
          <Text style={styles.reset}>Reset All</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderTypePicker = () => {
    const pickerItems = typeList.map((value, index) => {
      if (index > 0) {
        return (
          <Dialog.Description
            key={index}
            onPress={() => {
              setShowPicker(false);
              setType(index);
            }}>
            {value}
          </Dialog.Description>
        );
      }
      //use first element to render title
      return <Dialog.Title key={index}>{value}</Dialog.Title>;
    });
    return (
      <Dialog.Container visible={showPicker}>{pickerItems}</Dialog.Container>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {renderTypePicker()}
      <Header
        totalPieces={totalPieces}
        totalM3={totalM3}
        type={type}
        showPicker={() => setShowPicker(true)}
      />
      {/* there is an error when first time loading the app, complaining about VirtualizedLists should never be nested inside plain ScrollViews>. However if remove scrollView, the final few rows will stop the keyboard pop up*/}
      <ScrollView keyboardShouldPersistTaps="always">
        <FlatList
          ListFooterComponent={<ResetButton />}
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item: {id: number}) => String(item.id)}
          initialNumToRender={diameterLength}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

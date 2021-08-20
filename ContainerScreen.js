import React, {Component} from 'react';
import {TouchableOpacity, Text, View, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Dialog from 'react-native-dialog';

import PCSListItem from './components/PCSListItem';
import * as actions from './action';
import {
  coefficientList,
  LANGUAGE,
  lengthTypeList,
  diameterOffset,
} from './constant';
import generateStyles, {
  cellWidthLeft,
  cellWidthMiddle,
  cellWidthRight,
  totalWidth,
} from './styles';

const fontSizeValue = 15;
const headerCellHeight = 28;
const PCSListItemHeight = 42;
const preventTappingDelay = 300;
const styles = generateStyles(fontSizeValue);

class ContainerScreen extends Component {
  constructor(props) {
    super(props);
    this.disableDoubleClick = false;
    // this object array is used for getting individual textInput reference, to move focus to next input
    // the idea is in parent method, pass 2 callback functions
    // first is getRef (get all item's textInput ref)
    // second is onNext (use the textInput reference and call focus to move the cursor focus)
    this.textInputRefList = [];
    this.createDataSource(props);
  }
  componentDidMount() {
    this.createDataSource(this.props);
  }
  createDataSource(props) {
    const {pcsList, lengthType} = props;
    this.dataSource = pcsList.map((element, index) => ({
      id: String(index + diameterOffset),
      index,
      pcs: element,
      coefficient: coefficientList[lengthType][index],
    }));
  }
  onResetPress = () => {
    this.preventDoubleTapHelper(this.props.resetAll);
  };
  onChangeLengthType = typeValue => {
    const {changeLengthType, clearLengthTypePicker} = this.props;
    const callback = value => {
      changeLengthType(value);
      clearLengthTypePicker();
    };
    this.preventDoubleTapHelper(callback, typeValue);
  };
  onPressLengthTypePicker = () => {
    this.preventDoubleTapHelper(this.props.displayLengthTypePicker);
  };
  onNext = currentIndex => {
    const nextIndex = Number(currentIndex) + 1;
    const currentRef = this.textInputRefList[currentIndex];
    const nextRef = this.textInputRefList[nextIndex];
    if (nextRef && nextRef.focus) {
      nextRef.focus();
    } else if (currentRef.blur) {
      currentRef.blur();
    }
  };
  preventDoubleTapHelper(callback, props) {
    if (this.disableDoubleClick) {
      return;
    }
    this.disableDoubleClick = true;
    callback(props);
    setTimeout(() => {
      this.disableDoubleClick = false;
    }, preventTappingDelay);
  }
  // render components
  renderErrorDialog() {
    const {error, clearError} = this.props;
    return (
      <Dialog.Container visible={error !== ''}>
        <Dialog.Title>{error}</Dialog.Title>
        <Dialog.Button label={LANGUAGE.OK} onPress={clearError} />
      </Dialog.Container>
    );
  }
  renderLengthTypePickerDialog() {
    const pickerItems = lengthTypeList.map((value, index) => {
      if (index > 0) {
        return (
          <Dialog.Description
            key={index}
            onPress={() => this.onChangeLengthType(index)}>
            {value}
          </Dialog.Description>
        );
      }
      //use first element to render title
      return <Dialog.Title key={index}>{value}</Dialog.Title>;
    });
    return (
      <Dialog.Container visible={this.props.showPicker}>
        {pickerItems}
      </Dialog.Container>
    );
  }
  renderFooterButton() {
    return (
      <View
        style={{
          ...styles.flexOne,
          ...styles.flexRow,
          height: headerCellHeight * 1.5,
          padding: 2,
          marginTop: 2,
        }}>
        <View style={styles.flexOne} />
        <TouchableOpacity onPress={this.onResetPress}>
          <Text
            style={{
              ...styles.normalText,
              ...styles.resetButtonStyle,
            }}>
            {LANGUAGE.RESET_ALL}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderStickyHeader() {
    const {pieces, m3, lengthType} = this.props;
    let lengthTypeHeader = lengthTypeList[lengthType];
    // styleSheet for TOTAL_PIECES and TOTAL_M3
    const totalStyles = {
      height: headerCellHeight,
      ...styles.normalTextFontBold,
      width: cellWidthLeft,
      ...styles.borderRight,
      ...styles.borderBottom,
    };
    // styleSheet for pieces and m3
    const totalValueStyles = {
      height: headerCellHeight,
      ...styles.normalTextFontBold,
      ...styles.borderBottom,
      color: '#d20046',
    };
    return (
      <View
        style={{
          paddingTop: 2,
          paddingHorizontal: 2,
          backgroundColor: '#FCFCFC',
        }}>
        <View
          style={{
            width: totalWidth,
            height: headerCellHeight,
            ...styles.flexRow,
            ...styles.borderAll,
          }}>
          <Text
            style={{
              ...styles.normalText,
              ...styles.flexOne,
              width: cellWidthLeft,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
            onPress={this.onPressLengthTypePicker}>
            {lengthTypeHeader}
          </Text>
        </View>
        <View
          style={{
            width: totalWidth,
            height: headerCellHeight * 2,
            ...styles.flexRow,
            ...styles.borderHorizontal,
            ...styles.borderBottom,
            backgroundColor: '#f4e2dc',
          }}>
          <View style={styles.flexColum}>
            <Text style={totalStyles}>{LANGUAGE.TOTAL_PIECES}</Text>
            <Text style={totalStyles}>{LANGUAGE.TOTAL_M3}</Text>
          </View>
          <View style={{...styles.flexColum, ...styles.flexOne}}>
            <Text style={totalValueStyles}>{pieces}</Text>
            <Text style={totalValueStyles}>{m3}</Text>
          </View>
        </View>
        <View
          style={{
            width: totalWidth,
            height: headerCellHeight,
            ...styles.flexRow,
            ...styles.borderHorizontal,
            ...styles.borderBottom,
            backgroundColor: '#8d93eb',
          }}>
          <Text
            style={{
              ...styles.normalTextFontBold,
              width: cellWidthLeft,
              ...styles.borderRight,
            }}>
            {LANGUAGE.DIAMETER}
          </Text>
          <Text
            style={{
              ...styles.normalTextFontBold,
              width: cellWidthMiddle,
              ...styles.borderRight,
            }}>
            {LANGUAGE.PCS}
          </Text>
          <Text
            style={{
              ...styles.normalTextFontBold,
              width: cellWidthRight,
            }}>
            {LANGUAGE.COEFFICIENT}
          </Text>
        </View>
      </View>
    );
  }
  renderItem = ({item}) => (
    <PCSListItem
      value={item}
      onNext={id => this.onNext(id)}
      getRef={(ref, id) => {
        this.textInputRefList[id] = ref;
      }}
    />
  );
  render() {
    // scrollView keyboardShouldPersistTaps set to handler
    const {pcsList} = this.props;
    this.createDataSource(this.props);
    return (
      <View>
        {this.renderErrorDialog()}
        {this.renderLengthTypePickerDialog()}
        {/*
          horizontal must be set to enable stickyHeaderIndices
        */}
        <ScrollView horizontal>
          <FlatList
            ListHeaderComponent={this.renderStickyHeader()}
            ListFooterComponent={this.renderFooterButton()}
            stickyHeaderIndices={[0]}
            data={this.dataSource}
            keyExtractor={item => item.id}
            extraData={pcsList}
            renderItem={this.renderItem}
            initialNumToRender={25}
            windowSize={15}
            getItemLayout={(data, index) => ({
              length: PCSListItemHeight,
              offset: PCSListItemHeight * index,
              index,
            })}
          />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.common.error,
    showPicker: state.common.showPicker,
    pcsList: state.container.pcsList,
    lengthType: state.container.lengthType,
    pieces: state.container.pieces,
    m3: state.container.m3,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(ContainerScreen);

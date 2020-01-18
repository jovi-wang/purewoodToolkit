import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import Dialog from 'react-native-dialog';

import PCSListItem from './components/PCSListItem';
import * as actions from './action';
import {coefficientDisplayList, LANGUAGE, lengthTypeList} from './constant';

const totalWidth =
  Math.min(Dimensions.get('window').width, Dimensions.get('window').height) - 4;
const cellWidthLeft = Math.floor(totalWidth * 0.23);
const cellWidthMiddle = Math.floor(totalWidth * 0.43);
const cellWidthRight = Math.floor(totalWidth * 0.34);
const cellHeight = 28;
const borderWidthValue = 2;
const fontSizeValue = 15;
const preventTappingDelay = 300;
const diameterOffset = 16;

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
  createDataSource({pcsList, lengthType}) {
    this.dataSource = pcsList.map((element, index) => ({
      id: String(index + diameterOffset),
      index,
      pcs: element,
      coefficient: coefficientDisplayList[lengthType][index],
    }));
  }
  onResetPress = () => {
    this.preventDoubleTapHelper(this.props.resetAll);
  };
  onChangeLengthType = typeValue => {
    const callback = value => {
      this.props.changeLengthType(value);
      this.props.clearLengthTypePicker();
      // if the value is the last index of the lengthTypeList,
      // it means user chose other length, we want to display the custom invoice length
      if (lengthTypeList[value] === 'other length') {
        this.props.displayInvoiceInputDialog();
        this.props.changeOtherLengthInvoiceValue('');
      }
    };
    this.preventDoubleTapHelper(callback, typeValue);
  };
  onClearErrorMessage = () => {
    this.props.clearError();
  };
  onPressLengthTypePicker = () => {
    this.preventDoubleTapHelper(this.props.displayLengthTypePicker);
  };
  onPressInvoiceInputConfirm = () => {
    const toNumber = Number(this.props.otherLengthInvoice);
    console.log(toNumber);
    if (toNumber !== 0 && !isNaN(toNumber)) {
      this.props.clearInvoiceInputDialog();
    }
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
    return (
      <Dialog.Container visible={this.props.error !== ''}>
        <Dialog.Title>{this.props.error}</Dialog.Title>
        <Dialog.Button label={LANGUAGE.OK} onPress={this.onClearErrorMessage} />
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
  renderInvoiceInputDialog() {
    return (
      <Dialog.Container visible={this.props.showInvoiceInputDialog}>
        <Dialog.Input
          label={LANGUAGE.ENTER_INVOICE_INPUT_LABEL}
          autoFocus
          keyboardType="numeric"
          underlineColorAndroid="black"
          onChangeText={text => {
            this.props.changeOtherLengthInvoiceValue(text);
          }}
        />
        <Dialog.Button
          label={LANGUAGE.OK}
          onPress={this.onPressInvoiceInputConfirm}
        />
      </Dialog.Container>
    );
  }
  renderFooterButton() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          height: cellHeight * 1.5,
          padding: 3,
        }}>
        <View style={{flex: 1}} />
        <TouchableOpacity onPress={this.onResetPress}>
          <Text
            style={{
              ...styles.normalText,
              width: totalWidth / 2,
              fontSize: styles.normalText.fontSize + 8,
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 5,
            }}>
            {LANGUAGE.RESET_ALL}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderStickyHeader() {
    const {pieces, m3, lengthType, otherLengthInvoice} = this.props;
    const lengthTypeHeader = lengthType
      ? lengthTypeList[lengthType] !== 'other length'
        ? lengthTypeList[lengthType]
        : `other length with invoice with invoice ${otherLengthInvoice}m`
      : LANGUAGE.LENGTH_PLACEHOLDER;
    return (
      <View
        style={{paddingTop: 2, paddingHorizontal: 2, backgroundColor: 'white'}}>
        <View
          style={{
            width: totalWidth,
            height: cellHeight,
            flexDirection: 'row',
            ...styles.borderAll,
          }}>
          <Text
            style={{
              ...styles.normalText,
              flex: 1,
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
            height: cellHeight * 2,
            flexDirection: 'row',
            ...styles.borderHorizontal,
            ...styles.borderBottom,
            backgroundColor: '#fcea99',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                height: cellHeight,
                fontWeight: 'bold',
                ...styles.normalText,
                width: cellWidthLeft,
                ...styles.borderRight,
                ...styles.borderBottom,
              }}>
              {LANGUAGE.TOTAL_PIECES}
            </Text>
            <Text
              style={{
                height: cellHeight,
                fontWeight: 'bold',
                ...styles.normalText,
                width: cellWidthLeft,
                ...styles.borderRight,
                ...styles.borderBottom,
              }}>
              {LANGUAGE.TOTAL_M3}
            </Text>
          </View>
          <View style={{flexDirection: 'column', flex: 1}}>
            <Text
              style={{
                height: cellHeight,
                ...styles.normalText,
                ...styles.borderBottom,
              }}>
              {pieces}
            </Text>
            <Text
              style={{
                height: cellHeight,
                ...styles.normalText,
                ...styles.borderBottom,
              }}>
              {m3}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: totalWidth,
            height: cellHeight,
            flexDirection: 'row',
            ...styles.borderHorizontal,
            ...styles.borderBottom,
            backgroundColor: '#a5f49c',
          }}>
          <Text
            style={{
              ...styles.normalText,
              width: cellWidthLeft,
              ...styles.borderRight,
              fontWeight: 'bold',
            }}>
            {LANGUAGE.DIAMETER}
          </Text>
          <Text
            style={{
              ...styles.normalText,
              width: cellWidthMiddle,
              ...styles.borderRight,
              fontWeight: 'bold',
            }}>
            {LANGUAGE.PCS}
          </Text>
          <Text
            style={{
              ...styles.normalText,
              width: cellWidthRight,
              fontWeight: 'bold',
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
        {this.renderInvoiceInputDialog()}
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
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  normalText: {
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
});

const mapStateToProps = state => {
  return {
    error: state.common.error,
    // loading: state.common.loading,
    showPicker: state.common.showPicker,
    showInvoiceInputDialog: state.common.showInvoiceInputDialog,
    pcsList: state.container.pcsList,
    lengthType: state.container.lengthType,
    pieces: state.container.pieces,
    m3: state.container.m3,
    otherLengthInvoice: state.container.otherLengthInvoice,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(ContainerScreen);

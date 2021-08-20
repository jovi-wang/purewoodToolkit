import React, {Component} from 'react';
import {TouchableOpacity, Text, View, FlatList} from 'react-native';
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
import {mainStyles as styles} from './styles';

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
    // in some cases, pcsList length is larger than coefficientList length
    // after map to PCSListItem format, filter items with undefined coefficient
    this.dataSource = pcsList
      .map((element, index) => ({
        id: String(index + diameterOffset),
        index,
        pcs: element,
        coefficient: coefficientList[lengthType][index],
      }))
      .filter(i => !isNaN(Number(i.coefficient)));
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
    }, 300);
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
      <View style={styles.resetContainer}>
        <TouchableOpacity onPress={this.onResetPress}>
          <Text style={styles.reset}>{LANGUAGE.RESET_ALL}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  renderStickyHeader() {
    const {pieces, m3, lengthType} = this.props;
    let lengthTypeHeader = lengthTypeList[lengthType];
    return (
      <View style={styles.container}>
        <Text
          style={styles.lengthType}
          numberOfLines={1}
          ellipsizeMode="tail"
          onPress={this.onPressLengthTypePicker}>
          {lengthTypeHeader}
        </Text>
        <View style={styles.totalPcsContainer}>
          <Text style={styles.totalLeftText}>{LANGUAGE.TOTAL_PIECES}</Text>
          <Text style={styles.totalRightText}>{pieces}</Text>
        </View>
        <View style={styles.totalPcsContainer}>
          <Text style={styles.totalLeftText}>{LANGUAGE.TOTAL_M3}</Text>
          <Text style={styles.totalRightText}>{m3}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.diameterHeader}>{LANGUAGE.DIAMETER}</Text>
          <Text style={styles.pcsHeader}>{LANGUAGE.PCS}</Text>
          <Text style={styles.coefficientHeader}>{LANGUAGE.COEFFICIENT}</Text>
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
    const {pcsList} = this.props;
    this.createDataSource(this.props);
    return (
      <View>
        {this.renderErrorDialog()}
        {this.renderLengthTypePickerDialog()}
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
          getItemLayout={(_, index) => ({
            length: 42,
            offset: 42 * index,
            index,
          })}
        />
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

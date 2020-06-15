import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import generateStyles, {
  cellWidthLeft,
  cellWidthMiddle,
  cellWidthRight,
  totalWidth,
} from '../styles';

import * as actions from '../action';
import {pcsValueLimit, LANGUAGE} from '../constant';

const cellHeight = 42;
const fontSizeValue = 22;
const styles = generateStyles(fontSizeValue);

class PCSListItem extends Component {
  onPressAdd = () => {
    const {
      lengthType,
      otherLengthInvoice,
      pcs,
      index,
      displayError,
      changePCSValue,
    } = this.props;
    // only dispatch when lengthType has been set properly
    if (lengthType === 0 && otherLengthInvoice === '') {
      displayError(LANGUAGE.SELECT_LENGTH_FIRST);
      return;
    }
    // do not dispatch new actions if the pcs value is already max value
    if (pcs < pcsValueLimit.MAX) {
      changePCSValue(index, 1);
    }
  };
  onPressMinus = () => {
    const {
      lengthType,
      otherLengthInvoice,
      pcs,
      index,
      displayError,
      changePCSValue,
    } = this.props;
    if (lengthType === 0 && otherLengthInvoice === '') {
      displayError(LANGUAGE.SELECT_LENGTH_FIRST);
      return;
    }
    // do not dispatch new actions if the pcs value is already min value
    if (pcs > pcsValueLimit.MIN) {
      changePCSValue(index, -1);
    }
  };
  // change pcs value in textInput
  onChangePCSInputValue = value => {
    const temp = Number(value);
    // if input is invalid, do not change value
    if (Number.isNaN(temp)) {
      return;
    }
    const {
      lengthType,
      otherLengthInvoice,
      pcs,
      index,
      displayError,
      changePCSValue,
    } = this.props;
    if (lengthType === 0 && otherLengthInvoice === '') {
      displayError(LANGUAGE.SELECT_LENGTH_FIRST);
      return;
    }
    // only change PCS value if value is inside limit range
    if (temp >= pcsValueLimit.MIN && temp <= pcsValueLimit.MAX) {
      changePCSValue(index, temp - pcs);
    }
  };
  onNextPress = () => {
    /*
        to achieve a feature that when press 'enter',
        move to next textInput and do not dismiss keyboard
        */
    this.props.onNext(this.props.id);
  };
  render() {
    return (
      <View style={{...styles.flexRow, paddingHorizontal: 2}}>
        <View
          style={{
            width: totalWidth,
            height: cellHeight,
            ...styles.flexRow,
            ...styles.borderHorizontal,
            ...styles.borderBottom,
          }}>
          <Text
            style={{
              ...styles.normalTextFontBold,
              width: cellWidthLeft,
              ...styles.borderRight,
              backgroundColor: '#b0ebe2',
            }}>
            {this.props.id}
          </Text>
          <View
            style={{
              ...styles.borderRight,
              justifyContent: 'space-between',
              ...styles.flexRow,
              width: cellWidthMiddle,
            }}>
            <TouchableOpacity
              style={{backgroundColor: '#707070'}}
              onPress={this.onPressMinus}>
              <Text
                style={{
                  ...styles.normalTextFontBold,
                  ...styles.buttonTextStyle,
                }}>
                {'−'}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={{
                ...styles.normalText,
                ...styles.flexOne,
                ...styles.noPadding,
              }}
              onChangeText={text => this.onChangePCSInputValue(text)}
              value={String(this.props.pcs)}
              ref={ref => this.props.getRef(ref, this.props.id)}
              returnKeyType="next"
              keyboardType="numeric"
              blurOnSubmit={false}
              onSubmitEditing={this.onNextPress}
            />
            <TouchableOpacity
              style={{backgroundColor: '#707070'}}
              onPress={this.onPressAdd}>
              <Text
                style={{
                  ...styles.normalTextFontBold,
                  ...styles.buttonTextStyle,
                }}>
                {'+'}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              ...styles.normalText,
              width: cellWidthRight,
            }}>
            {this.props.coefficient > 0
              ? Math.round(this.props.coefficient * 10000) / 10000
              : ''}
          </Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    error: state.common.error,
    lengthType: state.container.lengthType,
    otherLengthInvoice: state.container.otherLengthInvoice,
    id: ownProps.value.id,
    coefficient: ownProps.value.coefficient,
    pcs: ownProps.value.pcs,
    index: ownProps.value.index,
    onNext: ownProps.onNext,
    getRef: ownProps.getRef,
  };
};

export default connect(
  mapStateToProps,
  actions,
)(PCSListItem);

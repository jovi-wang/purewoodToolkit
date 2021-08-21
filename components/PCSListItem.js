import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';

import {listItemStyles as styles} from '../styles';
import * as actions from '../action';
import {pcsValueLimit, LANGUAGE} from '../constant';

class PCSListItem extends Component {
  onPressAdd = () => {
    const {lengthType, pcs, index, displayError, changePCSValue} = this.props;
    // only dispatch when lengthType has been set properly
    if (lengthType === 0) {
      displayError(LANGUAGE.SELECT_LENGTH_FIRST);
      return;
    }
    // do not dispatch new actions if the pcs value is already max value
    if (pcs < pcsValueLimit.MAX) {
      changePCSValue(index, 1);
    }
  };
  onPressMinus = () => {
    const {lengthType, pcs, index, displayError, changePCSValue} = this.props;
    if (lengthType === 0) {
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
    const {lengthType, pcs, index, displayError, changePCSValue} = this.props;
    if (lengthType === 0) {
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
      <View style={styles.container}>
        <Text style={styles.diameter}>{this.props.id}</Text>
        <View style={styles.pcs}>
          <TouchableOpacity
            style={styles.signBackgroundColor}
            onPress={this.onPressMinus}>
            <Text style={styles.signText}>{'−'}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={text => this.onChangePCSInputValue(text)}
            value={String(this.props.pcs)}
            ref={ref => this.props.getRef(ref, this.props.id)}
            returnKeyType="next"
            keyboardType="numeric"
            blurOnSubmit={false}
            onSubmitEditing={this.onNextPress}
          />
          <TouchableOpacity
            style={styles.signBackgroundColor}
            onPress={this.onPressAdd}>
            <Text style={styles.signText}>{'+'}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.coefficient}>
          {this.props.coefficient > 0 ? this.props.coefficient.toFixed(3) : ''}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.common.error,
    lengthType: state.container.lengthType,
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

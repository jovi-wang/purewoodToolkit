import React, { Component } from 'react';
import { TextInput, Text, Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../action';
import { pcsValueLimit, LANGUAGE, CONTAINER } from '../constant';

const totalWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) - 4;
const buttonWidth = Math.floor(totalWidth * 0.12);
const cellWidth_1 = Math.floor(totalWidth * 0.23);
const cellWidth_2 = Math.floor(totalWidth * 0.43);
const cellWidth_3 = Math.floor(totalWidth * 0.34);
const cellHeight = 42;
const borderWidthValue = 2;
const fontSizeValue = 22;

class PCSListItem extends Component {
    constructor(props) {
        super(props);
        width = Math.max(Dimensions.get('window').width, Dimensions.get('window').height);
    }
    onPressAdd = () => {
        const { lengthType, pcs, startTime, index } = this.props;
        // only dispatch when lengthType has been set properly
        if (lengthType === 0) {
            this.props.displayError(LANGUAGE.SELECT_LENGTH_FIRST);
            return;
        }
        // do not dispatch new actions if the pcs value is already max value
        if (pcs < pcsValueLimit.MAX) {
            if (!startTime) {
                this.props.setTimeValue(CONTAINER.SET_START_TIME);
            }
            this.props.changePCSValue(index, 1);
        }
    }
    onPressMinus = () => {
        const { lengthType, pcs, index } = this.props;
        if (lengthType === 0) {
            this.props.displayError(LANGUAGE.SELECT_LENGTH_FIRST);
            return;
        }
        // do not dispatch new actions if the pcs value is already min value
        if (pcs > pcsValueLimit.MIN) {
            this.props.changePCSValue(index, -1);
        }
    }
    onChangePCSInputValue = () => {
        console.log(this.props.index);
        // this.props.changePCSValue(inputName, value);
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 2 }}>
                <View style={{
                    width: totalWidth, height: cellHeight, flexDirection: 'row',
                    ...styles.borderHorizontal, ...styles.borderBottom
                }}>
                    <Text style={{
                        ...styles.normalText, width: cellWidth_1,
                        ...styles.borderRight, fontWeight: 'bold', backgroundColor: '#a5f49c'
                    }}>{this.props.id}</Text>
                    <View style={{
                        ...styles.borderRight, justifyContent: 'space-between',
                        flexDirection: 'row', width: cellWidth_2
                    }}>
                        <TouchableOpacity style={{ backgroundColor: '#f4fc8a' }} onPress={this.onPressMinus}>
                            <Text style={{
                                ...styles.normalText, fontSize: 26,
                                width: buttonWidth, fontWeight: 'bold', color: 'red',
                            }}>{'−'}</Text>
                        </TouchableOpacity>
                        <TextInput style={{
                            ...styles.normalText, flex: 1, padding: 0
                        }}
                            onChangeText={(text) => this.onChangePCSInputValue()}
                            value={String(this.props.pcs)}
                        />
                        <TouchableOpacity style={{ backgroundColor: '#f4fc8a' }} onPress={this.onPressAdd}>
                            <Text style={{
                                ...styles.normalText, fontSize: 26,
                                width: buttonWidth, fontWeight: 'bold', color: 'red'
                            }}>{'+'}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{
                        ...styles.normalText, width: cellWidth_3
                    }}>{this.props.coefficient > 0 ? this.props.coefficient : ''}</Text>
                </View>
            </View>
        );
    }
};
const mapStateToProps = (state, props) => {
    return {
        error: state.common.error,
        loading: state.common.loading,
        lengthType: state.container.lengthType,
        startTime: state.container.startTime,
        id: props.value.id,
        coefficient: props.value.coefficient,
        pcs: props.value.pcs,
        index: props.value.index
    }
}

const styles = StyleSheet.create({
    normalText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: fontSizeValue
    },
    borderAll: {
        borderColor: 'black', borderWidth: borderWidthValue
    },
    borderRight: {
        borderColor: 'black', borderRightWidth: borderWidthValue
    },
    borderBottom: {
        borderColor: 'black', borderBottomWidth: borderWidthValue
    },
    borderHorizontal: {
        borderColor: 'black', borderRightWidth: borderWidthValue, borderLeftWidth: borderWidthValue
    }
});

export default connect(mapStateToProps, actions)(PCSListItem);
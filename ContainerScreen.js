import React, { Component } from 'react';
import {
    Dimensions, StyleSheet, TouchableOpacity,
    Text, View, FlatList, ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Dialog from 'react-native-dialog';

import PCSListItem from './components/PCSListItem';
import * as actions from './action';
import { coefficientDisplayList, LANGUAGE, lengthTypeList } from './constant';

const totalWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height) - 4;
const cellWidthLeft = Math.floor(totalWidth * 0.23);
const cellWidthMiddle = Math.floor(totalWidth * 0.43);
const cellWidthRight = Math.floor(totalWidth * 0.34);
const cellHeight = 28;
const borderWidthValue = 2;
const fontSizeValue = 15;
const preventTappingDelay = 300;
const diameterOffset = 10;

class ContainerScreen extends Component {
    constructor(props) {
        super(props);
        this.disable = false;
        // this object array is used for getting individual textInput reference, to move focus to next input
        // the idea is in parent method, pass 2 callback functions
        // first is getRef (get all item's textInput ref)
        // second is onNext (use the textInput reference and call focus to move the cursor focus)
        this.textInputRefList = [];
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    onResetPress = () => {
        this.preventDoubleTapHelper(this.props.resetAll);
    };
    onChangeLengthType = (typeValue) => {
        const callback = (value) => {
            this.props.changeLengthType(value);
            this.props.clearLengthTypePicker();
        };
        this.preventDoubleTapHelper(callback, typeValue);
    }
    onClearErrorMessage = () => {
        this.props.clearError();
    }
    onPressLengthTypePicker = () => {
        this.preventDoubleTapHelper(this.props.displayLengthTypePicker);
    }
    onNext = (currentIndex) => {
        const nextIndex = Number(currentIndex) + 1;
        const currentRef = this.textInputRefList[currentIndex];
        const nextRef = this.textInputRefList[nextIndex];
        if (nextRef && nextRef.focus) {
            nextRef.focus();
        } else if (currentRef.blur) {
            currentRef.blur();
        }
    }
    preventDoubleTapHelper(callback, props) {
        if (this.disable) return;
        this.disable = true;
        callback(props);
        setTimeout(() => {
            this.disable = false;
        }, preventTappingDelay);
    }
    createDataSource({ pcsList, lengthType }) {
        this.dataSource = pcsList.map((element, index) => ({
            id: String(index + diameterOffset),
            index,
            pcs: element,
            coefficient: coefficientDisplayList[lengthType][index]
        }));
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
    renderLengthTypePicker() {
        const pickerItems = lengthTypeList.map((value, index) => {
            if (index > 0) {
                return (
                    <Dialog.Description
                        key={index}
                        onPress={() => this.onChangeLengthType(index)}
                    >{value}</Dialog.Description>
                );
            }
            //use first element to render title
            return (
                <Dialog.Title key={index}>{value}</Dialog.Title>
            );
        });
        return (
            <Dialog.Container visible={this.props.showPicker}>
                {pickerItems}
            </Dialog.Container>
        );
    }
    renderFooterButton() {
        return (
            <View style={{ flex: 1, flexDirection: 'row', height: cellHeight * 1.5, padding: 3 }}>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    onPress={this.onResetPress}
                >
                    <Text
                        style={{
                            ...styles.normalText,
                            width: totalWidth / 2,
                            fontSize: styles.normalText.fontSize + 8,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5
                        }}
                    >{LANGUAGE.RESET_ALL}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    renderStickyHeader() {
        const { pieces, m3, lengthType } = this.props;
        return (
            <View style={{ paddingTop: 2, paddingHorizontal: 2, backgroundColor: 'white' }}>
                <View
                    style={{
                        width: totalWidth,
                        height: cellHeight,
                        flexDirection: 'row',
                        ...styles.borderAll
                    }}
                >
                    <Text
                        style={{
                            ...styles.normalText,
                            flex: 1,
                            width: cellWidthLeft
                        }}
                        // disabled={this.disable}
                        onPress={this.onPressLengthTypePicker}
                    >{lengthType ? lengthTypeList[lengthType] : LANGUAGE.LENGTH_PLACEHOLDER}</Text>
                </View>
                <View
                    style={{
                        width: totalWidth,
                        height: cellHeight * 2,
                        flexDirection: 'row',
                        ...styles.borderHorizontal,
                        ...styles.borderBottom,
                        backgroundColor: '#fcea99'
                    }}
                >
                    <View style={{ flexDirection: 'column' }}>
                        <Text
                            style={{
                                height: cellHeight,
                                fontWeight: 'bold',
                                ...styles.normalText,
                                width: cellWidthLeft,
                                ...styles.borderRight,
                                ...styles.borderBottom
                            }}
                        >{LANGUAGE.TOTAL_PIECES}</Text>
                        <Text
                            style={{
                                height: cellHeight,
                                fontWeight: 'bold',
                                ...styles.normalText,
                                width: cellWidthLeft,
                                ...styles.borderRight,
                                ...styles.borderBottom
                            }}
                        >{LANGUAGE.TOTAL_M3}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', flex: 1 }}>
                        <Text
                            style={{
                                height: cellHeight,
                                ...styles.normalText,
                                ...styles.borderBottom
                            }}
                        >{pieces}</Text>
                        <Text
                            style={{
                                height: cellHeight,
                                ...styles.normalText,
                                ...styles.borderBottom
                            }}
                        >{m3}</Text>
                    </View>
                </View>
                <View
                    style={{
                        width: totalWidth,
                        height: cellHeight,
                        flexDirection: 'row',
                        ...styles.borderHorizontal,
                        ...styles.borderBottom,
                        backgroundColor: '#a5f49c'
                    }}
                >
                    <Text
                        style={{
                            ...styles.normalText,
                            width: cellWidthLeft,
                            ...styles.borderRight,
                            fontWeight: 'bold'
                        }}
                    >{LANGUAGE.DIAMETER}</Text>
                    <Text
                        style={{
                            ...styles.normalText,
                            width: cellWidthMiddle,
                            ...styles.borderRight,
                            fontWeight: 'bold'
                        }}
                    >{LANGUAGE.PCS}</Text>
                    <Text
                        style={{
                            ...styles.normalText, width: cellWidthRight, fontWeight: 'bold'
                        }}
                    >{LANGUAGE.COEFFICIENT}</Text>
                </View>
            </View>
        );
    }

    render() {
        // scrollview keyboardShouldPersistTaps set to handler
        const { pcsList } = this.props;
        return (
            <View>
                {this.renderErrorDialog()}
                {this.renderLengthTypePicker()}
                {/*
                    horizontal must be set to enable stickyHeaderIndices
                 */}
                <ScrollView horizontal>
                    <FlatList
                        ListHeaderComponent={this.renderStickyHeader()}
                        ListFooterComponent={this.renderFooterButton()}
                        stickyHeaderIndices={[0]}
                        data={this.dataSource}
                        keyExtractor={(item) => item.id}
                        extraData={pcsList}
                        renderItem={({ item }) =>
                            <PCSListItem
                                value={item}
                                onNext={(id) => this.onNext(id)}
                                getRef={(ref, id) => { this.textInputRefList[id] = ref; }}
                            />}
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

const mapStateToProps = state => {
    return {
        error: state.common.error,
        // loading: state.common.loading,
        showPicker: state.common.showPicker,
        pcsList: state.container.pcsList,
        lengthType: state.container.lengthType,
        pieces: state.container.pieces,
        m3: state.container.m3
    };
};

export default connect(mapStateToProps, actions)(ContainerScreen);

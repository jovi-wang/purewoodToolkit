import React, { Component } from 'react';
import { PermissionsAndroid, Dimensions, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Dialog from 'react-native-dialog';

import PCSListItem  from './components/PCSListItem';
import * as actions from './action';
import { coefficientDisplayList, CONTAINER, LANGUAGE, lengthTypeList } from './constant';
import { getStartEndTime } from './helper';

const totalWidth = Math.max(Dimensions.get('window').width, Dimensions.get('window').height) - 4 ;
const cellWidth = Math.floor(totalWidth/3);
const cellHeight = 28;
const borderWidthValue = 2;
const fontSizeValue = 15;
const preventTappingDelay = 300;

class ContainerScreen extends Component {
    constructor(props) {
        super(props);
        this.disable = false;
        this.rotate = false;
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        this.props.setTimeValue(CONTAINER.SET_OPEN_TIME);
    }
    componentWillMount() {
        this.createDataSource(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }
    createDataSource({ pcsList, lengthType }) {
        this.dataSource = pcsList.map((element, index)=>({
            id: String(index+12),
            index,
            pcs: element,
            coefficient: coefficientDisplayList[lengthType][index]
        }))
    }
    // events handler
    onResetExport = () => {
        if(this.disable) return;
        this.disable= true;
        const { name } = this.props;
        if (!name) {
            this.props.displayError(LANGUAGE.ENTER_CONTAINER_NAME_FIRST);
        } else {
            this.props.resetExport(this.props);
        }
        setTimeout(()=>this.disable= false, preventTappingDelay);
    };
    onChangeLengthType = (typeValue) => {
        this.props.changeLengthType(typeValue);
        this.props.clearLengthTypePicker();
    }
    onChangeTextInputValue = (inputName, value) => {
        this.props.changeTextInputValue(inputName, value);
    }
    onClearErrorMessage = () => {
        this.props.clearError();
    }
    displayLengthTypePicker = ()=>{
        if(this.disable) return;
        this.disable= true;
        this.props.displayLengthTypePicker();
        setTimeout(()=>this.disable= false, preventTappingDelay);
    }
    // render components
    renderErrorDialog() {
        return (
            <Dialog.Container visible={this.props.error !== ''}>
                <Dialog.Title>{this.props.error}</Dialog.Title>
                <Dialog.Button label={LANGUAGE.OK} onPress={this.onClearErrorMessage} />
            </Dialog.Container>
        )
    }
    renderLengthTypePicker() {
        const pickerItems = lengthTypeList.map((value, index)=> {
            if (index>0) {
                return (
                    <Dialog.Description key={index} onPress={()=>this.onChangeLengthType(index)}>{value}</Dialog.Description>
                )
            }
            //use first element to render title
            return (
                <Dialog.Title key={index}>{value}</Dialog.Title>
            )
        });
        return (
            <Dialog.Container visible={this.props.showPicker}>
                
                {pickerItems}
            </Dialog.Container>
        )
    }
    renderFooterButton() {
        if(this.props.loading) {
            return (
                <View style={{flex:1, flexDirection: 'row', height: cellHeight * 1.5, padding: 3}}>
                    <View style={{flex:1}}></View>
                    <View style={{width: totalWidth/2, justifyContent: 'center'}}>
                        <ActivityIndicator size='large'/>
                    </View>
                </View>
            );
        }
        return (
            <View style={{flex:1, flexDirection: 'row', height: cellHeight * 1.5, padding: 3}}>
                    <View style={{flex:1}}></View>
                    <TouchableOpacity 
                        disabled={this.disable}
                        onPress={this.onResetExport}>
                        <Text style={{...styles.normalText, 
                        width: totalWidth/2, fontSize: styles.normalText.fontSize + 8,
                        borderWidth: 1, borderColor: 'black',  borderRadius: 5
                        }}>{LANGUAGE.EXPORT_AND_RESET}</Text>
                    </TouchableOpacity>
                </View>
        );
    }
    renderStickyHeader() {
        const { name, tare, yard, pieces, m3, openTime, startTime, endTime, lengthType } = this.props;
        return (
            <View style={{paddingTop:2,paddingHorizontal: 2, backgroundColor: 'white'}}>
                <View style={{ 
                    flex:1,
                    width: totalWidth, height: cellHeight, flexDirection: 'row',
                    ...styles.borderAll
                    }}>
                    <Text style={{
                        ...styles.normalText, width: cellWidth,
                        ...styles.borderRight, fontWeight: 'bold'
                    }}>{LANGUAGE.CONTAINER_NAME}</Text>
                    <TextInput
                        style={{
                            flex: 1, padding: 0, ...styles.normalText
                        }}
                        placeholder={LANGUAGE.CONTAINER_NAME_PLACEHOLDER}
                        onChangeText={(text) => this.onChangeTextInputValue(CONTAINER.CHANGE_NAME, text)}
                        value={name} 
                    />
                </View>
                <View style={{ 
                    width: totalWidth, height: cellHeight, flexDirection: 'row', 
                    ...styles.borderBottom, ...styles.borderHorizontal
                    }}>
                    <Text style={{
                        ...styles.normalText, ...styles.borderRight,
                        width: cellWidth, fontWeight: 'bold'
                    }}>{LANGUAGE.LENGTH}</Text>
                    <Text style={{
                        ...styles.normalText, flex: 1,
                        width: cellWidth }}
                        disabled={this.disable}
                        onPress = {this.displayLengthTypePicker}
                        >{lengthType ? lengthTypeList[lengthType] : LANGUAGE.LENGTH_PLACEHOLDER}</Text>
                </View>
                <View style={{ 
                    width: totalWidth, height: cellHeight, flexDirection: 'row', 
                    ...styles.borderHorizontal, ...styles.borderBottom
                    }}>
                    <Text style={{
                        ...styles.normalText, 
                        ...styles.borderRight,
                        width: cellWidth, fontWeight: 'bold'
                    }}>{LANGUAGE.YARD}</Text>
                    <TextInput
                        style={{
                            flex:1, padding: 0, ...styles.normalText
                        }}
                        placeholder={LANGUAGE.YARD_PLACEHOLDER}
                        onChangeText={(text) => this.onChangeTextInputValue(CONTAINER.CHANGE_YARD, text)}
                        value={yard}
                    />
                </View>
                <View style={{ 
                    width: totalWidth, height: cellHeight, flexDirection: 'row', 
                    ...styles.borderHorizontal, ...styles.borderBottom
                    }}>
                    <Text style={{
                        ...styles.normalText, 
                        ...styles.borderRight,
                        width: cellWidth, fontWeight: 'bold'
                    }}>{LANGUAGE.TARE}</Text>
                    <TextInput
                        style={{
                            flex:1, textAlign: 'center', textAlignVertical: 'center', 
                            fontSize: fontSizeValue, padding: 0
                        }}
                        placeholder={LANGUAGE.TARE_PLACEHOLDER}
                        onChangeText={(text) => this.onChangeTextInputValue(CONTAINER.CHANGE_TARE, text)}
                        value={tare}
                    />
                </View>
                <View style={{ 
                    width: totalWidth, height: cellHeight, flexDirection: 'row', 
                    ...styles.borderHorizontal, ...styles.borderBottom
                    }}>
                    <Text style={{
                        ...styles.normalText, 
                        ...styles.borderRight,
                        width: cellWidth, fontWeight: 'bold'
                    }}>{LANGUAGE.DATE}</Text>
                    <Text style={{
                        flex: 1,
                        ...styles.normalText
                    }}>{openTime.date}</Text>
                </View>
                <View style={{ 
                    width: totalWidth, height: cellHeight, flexDirection: 'row', 
                    ...styles.borderHorizontal, ...styles.borderBottom
                    }}>
                    <Text style={{
                        ...styles.normalText, 
                        ...styles.borderRight,
                        width: cellWidth, fontWeight: 'bold'
                    }}>{LANGUAGE.START_END_TIME}</Text>
                    <Text style={{
                        flex: 1,
                        ...styles.normalText
                    }}>{getStartEndTime(startTime, endTime)}</Text>
                </View>
                <View style={{ 
                    width: totalWidth, height: cellHeight * 2, flexDirection: 'row', 
                    ...styles.borderHorizontal, ...styles.borderBottom, backgroundColor: '#e2d451'
                    }}>
                    <Text style={{
                        ...styles.normalText, 
                        ...styles.borderRight,
                        width: cellWidth, fontWeight: 'bold'
                    }}>{LANGUAGE.TOTAL}</Text>
                    <View style = {{flexDirection: 'column'}}>
                        <Text style={{
                                height: cellHeight,
                                ...styles.normalText, width: cellWidth,
                                ...styles.borderRight, ...styles.borderBottom
                            }}>{LANGUAGE.PIECES}</Text>
                        <Text style={{
                                height: cellHeight,
                                ...styles.normalText, width: cellWidth,
                                ...styles.borderRight, ...styles.borderBottom
                            }}>{LANGUAGE.M3}</Text>
                    </View>
                    <View style = {{flexDirection: 'column'}}>
                        <Text style={{
                                height: cellHeight,
                                ...styles.normalText, width: cellWidth -2,
                                ...styles.borderBottom
                            }}>{pieces}</Text>
                        <Text style={{
                                height: cellHeight,
                                ...styles.normalText, width: cellWidth -2,
                                ...styles.borderBottom
                            }}>{m3}</Text>
                    </View>
                </View>
                <View style={{ 
                    width: totalWidth, height: cellHeight, flexDirection: 'row', 
                    ...styles.borderHorizontal, ...styles.borderBottom, backgroundColor: '#9df441'
                    }}>
                    <Text style={{
                        ...styles.normalText, width: cellWidth,
                        ...styles.borderRight, fontWeight: 'bold'
                    }}>{LANGUAGE.DIAMETER}</Text>
                    <Text style={{
                         ...styles.normalText, width: cellWidth,
                         ...styles.borderRight, fontWeight: 'bold'
                    }}>{LANGUAGE.PCS}</Text>
                    <Text style={{
                         ...styles.normalText, width: cellWidth, fontWeight: 'bold'
                    }}>{LANGUAGE.COEFFICIENT}</Text>
                </View>
            </View>    
        )
    }

    render() {
        // scrollview keyboardShouldPersistTaps set to handler
        const { pcsList } = this.props;
        return (
            <View>
                {this.renderErrorDialog()}
                {this.renderLengthTypePicker()}
                <ScrollView horizontal>
                    <FlatList
                        ListHeaderComponent={this.renderStickyHeader()}
                        ListFooterComponent={this.renderFooterButton()}
                        stickyHeaderIndices={[0]}
                        data={this.dataSource}
                        keyExtractor={(item) => item.id}
                        extraData={pcsList}
                        renderItem={({item}) => <PCSListItem value={item}/>}
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
      loading: state.common.loading,
      showPicker: state.common.showPicker,
      pcsList: state.container.pcsList,
      lengthType: state.container.lengthType,
      pieces: state.container.pieces,
      m3: state.container.m3,
      name: state.container.name,
      tare: state.container.tare,
      yard: state.container.yard,
      openTime: state.container.openTime,
      startTime: state.container.startTime,
      endTime: state.container.endTime
    };
};

export default connect(mapStateToProps, actions)(ContainerScreen);

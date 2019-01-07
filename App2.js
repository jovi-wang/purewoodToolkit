import React, {Component} from 'react';
import {Platform, Alert, Button, Picker, TextInput, StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { language: '123' };
  }
  render() {
    return (
      <ScrollView horizontal>
       <View style={{flexDirection: 'column', padding: 2}}>
      <View 
      style={{flexDirection: 'row', height: 50 }}
      >
       <Button
  onPress={() => {
    Alert.alert('You tapped the button!');
  }}
  title="+"
/>
        <Text style={styles.bigblue}>HelloWorld 3434</Text>
        <Text style={styles.bigblue}>HelloWorld WithBorder</Text>
      </View>
      <View 
      style={{flexDirection: 'row', marginTop: -1, height: 50 }}
      >
        <Text style={styles.bigblue}>HelloWorld WithBorder</Text>
        <Picker
  selectedValue={this.state.language}
  style={{ height: 50, width: 100 }}
  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
  <Picker.Item label="1" value="java" />
  <Picker.Item label="2" value="js" />
</Picker>
        <TextInput
          style={styles.bigblue}
          placeholder="please enter value"
          onChangeText={(text) => console.log(text)}
        />
      </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bigblue: {
    textAlign: 'center',
    width: 150,
          color: 'blue',
          // fontWeight: 'bold',
          // fontSize: 15,
          borderColor: 'black',
          borderWidth: 1
  }
});
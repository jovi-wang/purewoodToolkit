import React, {Component} from 'react';
import {Platform, Picker, StyleSheet, Text, View, FlatList, ScrollView} from 'react-native';
import RNFS from 'react-native-fs';
import RNShare from 'react-native-share';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {coefficient, lengthSpecification} from './constant';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = { language: '123' };
    console.log(lengthSpecification);
  }
  generateHTML = ()=>{
    return `<html><head>
    <style>
    table {
    font-family: "Times New Roman", Times, serif;
    border-collapse: collapse;
    width: 100%;
    }
    
    td, th {
    border: 1px solid black;
    text-align: center;
    padding: 8px;
    }
    td.bold {
    font-weight: bold
    }
    </style>
    </head>
    <body>
    <table>
    <tr>
      <th >Container Number</th>
      <td colspan="2">test Container Number</td>
    </tr>
    <tr>
      <th >Length</th>
      <td colspan="2">2.9m with invoice 2.8m</td>
    </tr>
    <tr>
      <th >Yard</th>
      <td colspan="2">test Yard</td>
    </tr>
    <tr>
      <th>TARE</th>
      <td colspan="2">test Tare</td>
    </tr>
    <tr>
      <th rowspan="2">Total</th>
      <td>Pieces</td>
      <td>55577854</td>
    </tr>
    <tr>
      <td>m3</td>
      <td>55577854</td>
    </tr>
    <tr>
      <th>Diameter</th>
      <td class="bold">PCS</td>
      <td class="bold">m3/PCS</td>
    </tr>
    <tr>
      <th>12</th>
      <td>2</td>
      <td>3</td>
    </tr>
    <tr>
      <th>13</th>
      <td>2</td>
      <td>3</td>
    </tr>
    </table>
    </body>
    </html>`;
  }
  async componentDidMount() {
    var path = RNFS.DocumentDirectoryPath + '/test.jpg';

    // write the file
    // const written = await RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8');
    const result = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath+`/Download`); // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    console.log('line 27 result', RNFS.DocumentDirectoryPath);
    const {MainBundlePath, CachesDirectoryPath, ExternalCachesDirectoryPath, DocumentDirectoryPath,ExternalDirectoryPath,ExternalStorageDirectoryPath,TemporaryDirectoryPath,LibraryDirectoryPath,PicturesDirectoryPath,FileProtectionKeys} = RNFS;
    console.log('0', MainBundlePath, '1', CachesDirectoryPath, '2', ExternalCachesDirectoryPath, '3', DocumentDirectoryPath,'4',ExternalDirectoryPath,'5',ExternalStorageDirectoryPath,'6', TemporaryDirectoryPath,'7',LibraryDirectoryPath,'8',PicturesDirectoryPath,'9',FileProtectionKeys);
    console.log(result)
    // let shareOptions = {
    //   title: "React Native",
    //   message: "Hola mundo",
    //   url: "http://facebook.github.io/react-native/",
    //   subject: "Share Link" //  for email
    // };
    let shareImageBase64 = {
      title: "React Native",
      // message: "Hola mundo",
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==",
      // subject: "Share Link", //  for email
      type: 'image/jpeg'
    };
   
      // const result2 = await RNShare.open(shareImageBase64);
    //   console.log('result2', result2);
    
   

  }
  readFileList = async (event) => {
    // const result = await RNFS.readDir(`/data/user/0/com.purewoodtoolkit/cache`); // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    const result = await RNFS.readDir(RNFS.DocumentDirectoryPath);
    console.log('read dir result', result);
  }
  shareFile = async (event) => {
    const data = await RNFS.readFile(RNFS.DocumentDirectoryPath + '/test.pdf', 'base64');

    // console.log('line70', data);
    let shareImageBase64 = {
      title: "React Native",
      // message: "Hola mundo",
      url: "data:application/pdf;base64,"+data
      // subject: "Share Link", //  for email
      // type: 'image/jpeg'
    };
   
      const result2 = await RNShare.open(shareImageBase64);
  }
  writeFile = async (event) => {
    console.log(this.generateHTML())
    let options = {
      html: this.generateHTML(),
      // fileName: 'test',
      // directory: 'Document', //"/data/user/0/com.purewoodtoolkit/cache/PDF_0a10e2ae-aecf-4ef9-a3a7-954d5361d1862847895052711936428.pdf"
      // directory: `${RNFS.DocumentDirectoryPath}/`,
      base64: true
    };

    let file = await RNHTMLtoPDF.convert(options)
    console.log('line141', file)
   await RNFS.writeFile(RNFS.DocumentDirectoryPath + '/test.pdf', file.base64, 'base64');

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}
          onPress={this.readFileList}>
        read file list</Text>
        <Text style={styles.welcome}
          onPress={this.shareFile}>
        share file</Text>
        <Text style={styles.welcome}
          onPress={this.writeFile}>
        write file</Text>
        <FlatList
          data={[{key: 'a'}, {key: 'b'}]}
          renderItem={({item}) => <Text>{item.key}</Text>}
        />

{/* <Picker
  selectedValue={this.state.language}
  style={{ height: 50, width: 100 }}
  onValueChange={(itemValue, itemIndex) => {
    this.setState({language: itemValue});
    console.log(itemValue)
    }}>
  <Picker.Item label="0" value="c++" />
  <Picker.Item label="1" value="java" />
  <Picker.Item label="2" value="js" />
</Picker> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

import React, {Component} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import SignatureCapture from "react-native-signature-capture";


export default class StudentSignatureCaptureField extends Component{
    constructor(props){
      
  
      super(props);
      this.state = {
        signature : null,
      };
    }
    
    _signaturePadError = (error) => {
      console.error(error);
    };
  
    _signaturePadChange = ({base64DataUrl}) => {
      console.log("Got new Proctor signature: " + base64DataUrl);
    };
    render() {
      return (
          <View style={{ flex: 1, flexDirection: "column", marginVertical: 20}}>
              <Text style = {{justifyContent:'center', alignItems:'center'}}>Student Signature</Text>
              <SignatureCapture
                  type = 'studentSignature'
                  style={[{flex:1},styles.signature]}
                  ref="sign"
                  onSaveEvent={this.props._onStudentSaveEvent}
                  onDragEvent={this._onDragEvent}
                  saveImageFileInExtStorage={false}
                  showNativeButtons={false}
                  showTitleLabel={true}
                  showBorder={true}
                  maxSize = {200}
                  viewMode={"portrait"}/>
                  
                  

              <View style={{ flex: 1, flexDirection: "row", }}>
                  <TouchableHighlight style={styles.buttonStyle}
                      onPress={() => { this.saveSign() } } >
                      <Text>Save</Text>
                  </TouchableHighlight>

                  <TouchableHighlight style={styles.buttonStyle}
                      onPress={() => { this.resetSign() } } >
                      <Text>Reset</Text>
                  </TouchableHighlight>

              </View>

          </View>
      );
  }

  saveSign() {
      this.refs["sign"].saveImage();
  }

  resetSign() {
      this.refs["sign"].resetImage();
  }

  _onStuedentSaveEvent(result) {
      //result.encoded - for the base64 encoded png
      //result.pathName - for the file path name
      console.log(result.encoded + 'result');
  }
  _onDragEvent() {
       // called when signature is being made
      console.log("signing detected");
  }
}

const styles = StyleSheet.create({
  signature: {
      flex: 1,
      borderColor: '#000033',
      borderWidth: 35,
      
  },
  buttonStyle: {
      flex: 1, justifyContent: "center", alignItems: "center", height: 50,
      backgroundColor: "#eeeeee",
      margin: 10
  }
});





  
    
  
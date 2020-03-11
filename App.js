import React, {Component} from 'react';
import { Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import StudentPicker from './StudentPicker';
import StudentAndClassSelector from './StudentAndClassSelector';
import AppContainer from './Container';
// {"sudents": [{"AMStudents": [Array], "PMStudents": [Array], "classes": [Array]}]}




export default class App extends Component{
  render(){
    return(
      <AppContainer>
        <StudentAndClassSelector></StudentAndClassSelector>
      </AppContainer>
    );
  }
}

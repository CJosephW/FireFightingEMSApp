import React, {Component} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import StudentClassPicker from './StudentClassPicker';
import StudentPicker from './StudentPicker';
import StudentAndClassSelector from './StudentAndClassSelector';
// {"sudents": [{"AMStudents": [Array], "PMStudents": [Array], "classes": [Array]}]}

export default class App extends Component{
  render(){
    return(
      <StudentAndClassSelector></StudentAndClassSelector>
    );
  }
}

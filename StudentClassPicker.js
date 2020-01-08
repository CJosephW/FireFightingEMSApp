import React, {Component} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';

export default class StudentClassPicker extends Component{
    constructor(props){
      
  
      super(props);
      this.state = {
        isLoading: true,
      };
    }
  
    render(){

    
  
      return(
        <Dropdown
        baseColor = 'black'
        textColor = 'blue'
        label = 'Shift'
        data = {shift_dropdown}
        //OnChangeText

        />
      );
    }
  }


  
    
  
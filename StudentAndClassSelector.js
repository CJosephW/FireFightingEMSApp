import React, {Component} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import StudentClassPicker  from './StudentClassPicker';
import StudentPicker from './StudentPicker';


export default class StudentAndClassPicker extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
        <View>
            <StudentClassPicker current_class = {this.state.current_class}></StudentClassPicker>
            <StudentPicker current_class = {this.state.current_class}></StudentPicker>
        </View>
        );
    }
}
import React, {Component} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import StudentPicker from './StudentPicker';


export default class StudentAndClassPicker extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return(
            <StudentPicker ></StudentPicker>
        );
    }
}
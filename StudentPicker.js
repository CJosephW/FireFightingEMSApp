import React, {Component} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation, thisExpression } from '@babel/types';


export default class StudentPicker extends Component{
    constructor(props) {
      super (props);
      this.state = {
        students : [],
        CurrentStudent: ''
      }
    }
    
    componentDidMount(){
      
    }
    returnStudent(){
      this.props.getStudentName(this.state.CurrentStudent)
    }
    render(){
      let shift_dropdown = [{
        value: 'AM',
      },
        {
          value: 'PM',
      }];
     

      return(
        <View>
          <View>
            <Dropdown
            baseColor = 'black'
            textColor = 'blue'
            label = 'Shift'
            data = {shift_dropdown}
            onChangeText={(value)=> {this.setState({
              CurrentClass:value
            });}}
            //OnChangeText
            ></Dropdown>
          </View>
          <View>
            <Dropdown
              baseColor = 'black'
              itemColor = 'blue'
              label = 'Select Student'
              data = { this.state.CurrentClass == "AM" ? this.state.AMStudents : this.state.PMStudents}
              onChangeText = {(value)=>{this.setState({CurrentStudent:value}); this.returnStudent();}}
            ></Dropdown>
          </View>
        </View>
      );
    }
    
    }
  
  
  

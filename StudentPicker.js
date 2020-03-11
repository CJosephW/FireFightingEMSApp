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
      //GET students from database
      fetch('http://10.0.2.2:3000/v1/students.json', {
        method: 'GET',
        headers:{
          'Accept': 'application/json',
          'Accept-Encoding' : "gzip, deflate",
          'Content-Type': 'application/json',
        }
      }).then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        let studentJSON = responseJson.sudents[0];
        let AMStudents = [];
        for (student of studentJSON.AMStudents) { 
          AMStudents.push({
            value: student
          });
        }

        let PMStudents = [];
        for (student of studentJSON.PMStudents) {
          PMStudents.push({
            value: student
          });
        }
        let CurrentClass = ''; 
        this.setState({AMStudents, PMStudents});
        this.setState({isLoading : false})
        this.setState({CurrentClass})
        
      })
      .catch((error) => {
        console.error(error);
  
      });
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
  
  
  

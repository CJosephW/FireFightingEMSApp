import { CheckBox } from "react-native";
import React, {Component, Fragment,} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class CustomCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state ={
            checked: false
        };
    }
    toggleChange(){
        this.setState({checked: !this.state.checked});
    }
    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                <CheckBox
                
                value = {this.state.checked}
                onChange = {() => this.toggleChange()}
                ></CheckBox>
            </View>
        );
    }
}

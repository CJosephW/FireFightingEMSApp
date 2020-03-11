import { CheckBox } from "react-native";
import React, {Component, Fragment,} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class CustomCheckbox extends Component {
    constructor(props) {
        super(props);
        this.state ={
        };
    }
    //custom checkbox component for skills
    
    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
                <View style = {styles.checkboxRow}>
                    <Text>Pass:</Text>
                    <CheckBox
                    value = {this.props.pass}
                    onChange = {this.props.toggleChangePass}
                    ></CheckBox>
                    <Text>Fail:</Text>
                    <CheckBox
                    value = {this.props.fail}
                    onChange = {this.props.toggleChangeFail}
                    ></CheckBox>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    checkboxRow:{
        flex: 1,
        flexDirection:'row',
        marginVertical:10,
        justifyContent:"center",
        alignItems:'center'
    }
})

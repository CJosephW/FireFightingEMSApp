import React, {Component, Fragment} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation, emptyStatement } from '@babel/types';
import StudentPicker from './StudentPicker';
import  SearchableDropdown from 'react-native-searchable-dropdown';
import RNPicker from "rn-modal-picker";

export default class SkillPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedText : ""
        }
    }
    _selectedValue( item) {
        this.setState({selectedText: item});
    }

    componentDidMount(){
        fetch('http://10.0.2.2:3000/v1/skills', {
            method: 'GET',
            headers:{
                'Accept': 'application/json',
                "Accept-Encoding" : 'gzip, deflate',
                'Content-Type' : 'application/json',

            }
        }).then(response => response.json())
        .then(responseJson => {
            
            
            let titles = [];
            console.log(responseJson[0].title)
            
            let parsedSkills = [];
            
            for (let i = 0; i < responseJson.length; i++){ 

                    titles.push({
                        
                        name : responseJson[i].title
                });
       
            }
            this.setState({titles});
            this.setState({isLoading: false});
        })
        .catch((error) => {
            console.error(error);
        });
            
            }
        
    

    render() {
        return(
            <View>
                <SearchableDropdown
                    onTextChange={(text) =>  console.log(text)}
                    onItemSelect={(item) =>  alert(JSON.stringify(item))}
                    containerStyle={{
                        padding: 5
                    }}
                    textInputStyle={{
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5
                    }}
                    itemStyle={{
                        padding: 10,
                        marginTop: 2,
                        backgroundColor: '#ddd',
                        borderColor: '#bbb',
                        borderWidth: 1,
                        borderRadius:5
                    }}
                    itemTextStyle={{
                    color: '#222'
                    }}
                    itemsContainerStyle={{
                        maxHeight: 140
                    }}
                    items={this.state.titles}
                    placeholder="Placeholder."
                    resetValue={false}
                    underlineColorAndroid='transparent' />
                </View>
        );
    }
}
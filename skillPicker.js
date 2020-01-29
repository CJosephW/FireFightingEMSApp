import React, {Component, Fragment,} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation, emptyStatement } from '@babel/types';
import  SearchableDropdown from 'react-native-searchable-dropdown';
import CircleCheckBox, {LABEL_POSITION} from 'react-native-circle-checkbox';
import CustomCheckbox from "./CustomCheckboxComponent";

export default class SkillPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedItem: "",
            renderTasks : false,
            checBoxTitle : "Test",
            current_tasks : []
        }
    }
    _selectedValue( item) {
        this.setState({selectedText: item});
    }
    _getTasks = (item)=>{
        
        this.setState({selectedItem: item});
        this.setState({current_tasks : []});

        console.log(this.state.selectedItem.name);
        
        for ( let i = 0; i < this.state.responseJson.length; i++){
           
            if(this.state.responseJson[i].title == this.state.selectedItem.name){
               
                console.log('found it');
               
                for (task of this.state.responseJson[i].tasks){
                    console.log(task)
                    this.state.current_tasks.push({
                        value : task
                    });
                    
                }
            
            }

        }
        
        
            
        this.setState({renderTasks:true});
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
            let parsedSkills = [];
            
            for (let i = 0; i < responseJson.length; i++){ 

                    titles.push({
                        
                        name : responseJson[i].title,
                        
                });
       
            }
            this.setState({responseJson});
            this.setState({titles});
            this.setState({isLoading: false});
        })
        .catch((error) => {
            console.error(error);
        });
            
            }
        
    

    render() {
        let Arr = this.state.current_tasks.map(task => {
                return <View><CustomCheckbox name = {task.value}></CustomCheckbox></View>
            })
        console.log("are things alright over here?");
        
        return(
           
                <View>
                    <SearchableDropdown
                        onTextChange={(text) =>  console.log(text)}
                        onItemSelect={this._getTasks}
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
                       {Arr}
                </View>
        );

        
        
       
    
    }
}
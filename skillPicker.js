import React, {Component, Fragment,} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { thisTypeAnnotation, emptyStatement } from '@babel/types';
import  SearchableDropdown from 'react-native-searchable-dropdown';
import CustomCheckbox from "./CustomCheckboxComponent";
import {Dropdown} from 'react-native-material-dropdown';

export default class SkillPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedItem: "",
            current_tasks : [],
            CurrentStudent: '',
            students: [],
        }
    }
    returnStudent(){
        this.props.getStudentName(this.state.CurrentStudent);
    }
    _getTasks = (item)=>{
        //When Skill is selected this function iterates through and gets the tasks by finding a matching title
        this.setState({selectedItem: item});
        this.setState({current_tasks : []});//resets tasks when new item is selected
        
        console.log(this.state.selectedItem.name);
        
        for ( let i = 0; i < this.state.responseJson.length; i++){
            if(this.state.responseJson[i].title == this.state.selectedItem.name){
                for (task of this.state.responseJson[i].tasks){
                    this.state.current_tasks.push({
                        value : task,
                        pass: false,
                        fail: false,//pass and fail values for checkboxes
                    });
                }
            }
        }
        this.setState(this.current_tasks);//updates app to render new tasks
        this.props.getTasks(this.state.current_tasks);//giving data to parent component for POST
        this.props.getSkillTitle(this.state.selectedItem.name);//giving data to parent component for POST
    }
    toggleChangePass(title){
        for(task of this.state.current_tasks){
            if (task.value == title){
                if (task.pass == true){
                    task.pass = false;
                }
                else{
                    task.pass = true;
                    if(task.fail == true){
                        task.fail = false;//fail and pass cannot both be true
                    }
                }
                this.setState(this.state.current_tasks);
            }
        }
    }
    toggleChangeFail(title){
        for(task of this.state.current_tasks){
            if(task.value == title){
                if(task.fail == true){
                    task.fail = false;
                }
                else{
                    task.fail = true;
                    if (task.pass == true){
                        task.pass = false;//fail and pass cannot both be true
                    }
                }
                this.setState(this.state.current_tasks);
            }
        }
    }
    componentDidMount(){
        fetch('http://10.0.2.2:3000/v1/skills', {
            method: 'GET',//getting skill information from RESTful API
            headers:{
                'Accept': 'application/json',
                "Accept-Encoding" : 'gzip, deflate',
                'Content-Type' : 'application/json',

            }
        }).then(response => response.json())
        .then(responseJson => {
            let titles = [];            
            for (let i = 0; i < responseJson.length; i++){ 
                    titles.push({
                        name : responseJson[i].title,//push titles into array
                });
            }
            this.setState({responseJson});
            this.setState({titles});
            this.setState({isLoading: false});
        })
        .catch((error) => {
            console.error(error);
        });
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

    render() {
        let Arr = this.state.current_tasks.map(task => {
                return <View><CustomCheckbox name = {task.value} pass = {task.pass} fail = {task.fail} toggleChangeFail = {() => this.toggleChangeFail(task.value)} toggleChangePass = {() =>this.toggleChangePass(task.value)}></CustomCheckbox></View>
            })//pragmatically renders tasks into checkboxes with pass and fail boolean values
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
                    <View>
                        <SearchableDropdown
                            maxSize = {100}
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
                            placeholder="Please Select Skill: "
                            resetValue={false}
                            underlineColorAndroid='transparent' />
                        </View>
                       {Arr}
                       
                </View>
        );
    }
}
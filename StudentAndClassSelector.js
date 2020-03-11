import React, {Component} from 'react';
import { Header, Content, Picker, Form} from 'native-base';
import {View, Text, StyleSheet, Alert, Button} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';
import SkillPicker from './skillPicker';
import ProctorSignatureCaptureField from './SignatureCapture';
import StudentSignatureCaptureField from './StudentSignatureCapture';
import {TextField} from 'react-native-materialui-textfield';

export default class StudentAndClassPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            screenHeight:0,
            proctorSig64 : '',
            studentSig64: '',
            tasks:[],
            proctorName: '',
            studentName:'',
            skillTitle: '',  
        }
    }
    _onProctorSaveEvent = (result)  =>{
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        this.setState({proctorSig64: result.encoded})
        console.log(this.state.proctorSig64);
    }
    _onStudentSaveEvent = (result)  =>{
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        this.setState({studentSig64: result.encoded})
    }
    getTasks = (returnedTasks) =>{
        this.setState({tasks: returnedTasks});
    }
    getSkillTitle = (title) =>{
        this.setState({skillTitle : title});
    }
    getStudentName  = (name) =>{
        this.setState({studentName : name});
    }
    postSkill = () =>{
        tasks = this.state.tasks;
        let studentTaskMap = new Map();
        var studentSkill = {//Making a JS object for POST with requried data
            title : this.state.skillTitle,
            studentName : this.state.studentName,
            proctorName : this.state.proctorName,
            studentSig : this.state.studentSig64,
            proctorSig : this.state.proctorSig64,
            tasks : this.state.tasks
        }
        async function PostSkill(){
            try{
                let response = await fetch(
                    "http://10.0.2.2:3000/v1/studentskills",//postURL
                    {
                        method: "POST",
                        headers:{
                            "Accept": "application/json",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(studentSkill)//parsing into JSON
                    }
                );
                if(response.status >= 200 && response.status < 300){
                    console.log('all good');
                }
            } catch(errors){
                alert(errors);
            }
        }
        PostSkill();
    }
    render() {
        let {proctorName} = this.state;
        return(
           <View>
                <TextField
                    label = "Proctor Name"
                    value = {proctorName}
                    onChangeText= {(proctorName) => this.setState({proctorName})}//update proctorName state on any change in text
                ></TextField>
                <SkillPicker 
                getTasks = {this.getTasks}//props function to get data from child
                getSkillTitle = {this.getSkillTitle}//props function to get data from child
                getStudentName = {this.getStudentName}
                ></SkillPicker>
                <View style = {styles.signatureRow}>
                    <ProctorSignatureCaptureField 
                     _onSaveEvent = {this._onProctorSaveEvent}
                     ></ProctorSignatureCaptureField>
                    <StudentSignatureCaptureField
                    _onStudentSaveEvent = {this._onStudentSaveEvent}
                    ></StudentSignatureCaptureField>
                </View>
                <Button
                title="Submit Skill"
                onPress={this.postSkill}//runs POST on button press
                ></Button>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    signatureRow:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    }
})
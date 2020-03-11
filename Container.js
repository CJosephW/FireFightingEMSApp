import React, {Component} from 'react';
import {Container, Header, Content, Picker, Form} from 'native-base';
import {Dropdown} from 'react-native-material-dropdown';
import {View, Text, StyleSheet, FlatList, YellowBox,ScrollView, SafeAreaView, Dimensions, RTCScrollView} from 'react-native';
import { thisTypeAnnotation } from '@babel/types';

const {height} = Dimensions.get('window');

export default class AppContainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            screenHeight:0,
        }
    }
    //scroll view for App

    onContentSizeChange = (contentWidth, contentHeight) =>{
        this.setState({screenHeight: contentHeight});
    };

    render(){
        const scrollEnabled = this.state.screenHeight > height;
        return(
            // keyboardShouldPersistTaps = TRUE otherwise you can't interact with dropdown
        <SafeAreaView keyboardShouldPersistTaps = {true} style={styles.container} >
           
            <ScrollView
            keyboardShouldPersistTaps = {true}
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollview}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
            >
                <View>
                    {this.props.children}
                </View>
            </ScrollView>
        </SafeAreaView>
        
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
     
    },
    scrollview: {
      flexGrow: 1,
    },
    content: {
      flexGrow: 1,
      justifyContent: "space-between",
     
    },
  });
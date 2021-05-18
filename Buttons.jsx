import React from 'react';
import {StyleSheet,View, TouchableHighlight,TouchableWithoutFeedback, Text,TouchableOpacity,Image} from 'react-native';
import styles from './assets/stylesheet.js';

import {AddImg,EditImg,RemoveImg,ArrowImg,AlertImg,XImg, SearchImg} from './assets/SvgComponents.jsx';

const AddButton = (props) => {
    return (
        <TouchableHighlight style={StyleSheet.compose(styles.button,styles.addButton)} onPress={props.onClick}>
            <AddImg 
                width={styles.buttonImg.width} 
                height={styles.buttonImg.height}
                backgroundColor="#fff"    
            />
        </TouchableHighlight>
    );
};

const EditButton = (props) => {
    return (
        <TouchableHighlight style={StyleSheet.compose(styles.button,styles.editButton)} onPress={props.onClick}>
            <EditImg width={styles.buttonImg.width} height={styles.buttonImg.height}/>
        </TouchableHighlight>
    );
};

const RemoveButton = (props) => {
    return (
        <TouchableHighlight style={StyleSheet.compose(styles.button,styles.removeButton)} onPress={props.onClick}>
            <RemoveImg width={styles.buttonImg.width} height={styles.buttonImg.height}/>
        </TouchableHighlight>
    );
};

const ArrowButton = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onClick}>
            <View style={StyleSheet.compose(styles.button,styles.arrowButton)}>
                <ArrowImg width={styles.arrowButton.width} height={styles.arrowButton.height}/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const SubmitButton = (props) => {
    return (
        <View style={{paddingTop:50}}>
            <TouchableOpacity onPress={props.onClick}>
                <View style={styles.submitButton}>
                    <Text style={styles.submitButtonH1}>{props.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const ConfirmationDialog = (props) => {
    if (props.condition){
        const [onClick1,onClick2] = props.actions;

        return (
            <View style={styles.popUp}>
                <View style={styles.errorDialog}>
                    <AlertImg/>
                    {props.message}
                    <View style={{flexDirection:'row', alignContent: 'space-between'}}>
                        <TouchableOpacity onPress={onClick1}>
                            <View style={styles.confirmationDialogView1}>
                                <Text style={styles.confirmationDialogButton1}>{props.titles[0]}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onClick2}>
                            <View style={styles.confirmationDialogView2}>
                                <Text style={styles.confirmationDialogButton2}>{props.titles[1]}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    return null;
}

const ErrorDialog = (props) => {

    if(props.condition){
        return (
            <View style={styles.popUp}>
                <View style={styles.errorDialog}>
                    <AlertImg/>
                    {props.message}
                    <TouchableOpacity onPress={props.onClick}>
                        <View style={styles.errorDialogView}>
                            <Text style={styles.errorDialogButton}>OK</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return null;
}

const AddGalery = (props) => {
    return(
        <TouchableWithoutFeedback onPress={props.onClick}>
            <View style={styles.addGaleryButton}>
                <AddImg 
                    width={styles.addGaleryImg.width} 
                    height={styles.addGaleryImg.height}
                    backgroundColor="#C2CFD6"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const XButton = (props) => {
    return(
        <TouchableWithoutFeedback onPress={props.onClick}>
            <View style={styles.xButton}>
                <XImg/>
            </View>
        </TouchableWithoutFeedback>
    );
}

const DateInput = (props) => {
    return(
        <TouchableHighlight onPress={props.onClick}>
            <View style={styles.dateInput}>
                <SearchImg width={styles.searchImg.width} height={styles.searchImg.height} style={styles.dateSearchImg}/>
                <Text style={styles.dateInputText}>{props.date}</Text>
            </View>
        </TouchableHighlight>
    );
}

const ImagePopUp = (props) => {
    return(
        <View style={styles.popUp}>
            <View style={styles.imagePopUpContainer}>
                <XButton onClick={props.xButton}/>
                <Image source={{uri: props.uri}} style={styles.imagePopUp}/>
                {props.removeButton && (
                <View style={styles.imageRemoveButton}>
                    <RemoveButton onClick={props.removeButton}/>
                </View>
                )}
            </View>
        </View>
    );
}

export {AddButton,EditButton,RemoveButton,ArrowButton,SubmitButton,ConfirmationDialog,ErrorDialog, AddGalery, XButton,DateInput,ImagePopUp};
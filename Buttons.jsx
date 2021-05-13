import React from 'react';
import {StyleSheet,View, TouchableHighlight,TouchableWithoutFeedback, Text,TouchableOpacity} from 'react-native';
import styles from './assets/stylesheet.js';

import {AddImg,EditImg,RemoveImg,ArrowImg} from './assets/SvgComponents.jsx';

const AddButton = (props) => {
    return (
        <TouchableHighlight style={StyleSheet.compose(styles.button,styles.addButton)} onPress={props.onClick}>
            <AddImg width={styles.buttonImg.width} height={styles.buttonImg.height}/>
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
    const [onClick1,onClick2] = props.actions;

    return (
        <View style={styles.popUp}>
            <View style={styles.confirmationDialog}>
                {props.message}
                <TouchableOpacity onPress={onClick1}>
                    <View style={styles.confirmationDialogView1}>
                        <Text style={styles.confirmationDialogText1}>{props.titles[0]}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClick2}>
                    <View styles={styles.confirmationDialogView2}>
                        <Text style={styles.confirmationDialogText2}>{props.titles[1]}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export {AddButton,EditButton,RemoveButton,ArrowButton,SubmitButton,ConfirmationDialog};
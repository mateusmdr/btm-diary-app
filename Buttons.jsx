import React from 'react';
import {StyleSheet,View, TouchableHighlight,TouchableWithoutFeedback} from 'react-native';
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

export {AddButton,EditButton,RemoveButton,ArrowButton};
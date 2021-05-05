import React from 'react';
import {View, StyleSheet} from 'react-native';
import styles from './assets/stylesheet.js';

import {AddImg,EditImg,RemoveImg} from './assets/SvgComponents.jsx';

const AddButton = () => {
    return (
        <View style={StyleSheet.compose(styles.button,styles.addButton)}>
            <AddImg width={styles.buttonImg.width} height={styles.buttonImg.height}/>
        </View>
    );
};

const EditButton = () => {
    return (
        <View style={StyleSheet.compose(styles.button,styles.editButton)}>
            <EditImg width={styles.buttonImg.width} height={styles.buttonImg.height}/>
        </View>
    );
};

const RemoveButton = () => {
    return (
        <View style={StyleSheet.compose(styles.button,styles.removeButton)}>
            <RemoveImg width={styles.buttonImg.width} height={styles.buttonImg.height}/>
        </View>
    );
};

export {AddButton,EditButton,RemoveButton};
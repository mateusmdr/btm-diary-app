import React from 'react';
import {View,Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import styles from "./stylesheet";

const Header = () => {

    return (
        <LinearGradient style={styles.header} colors={['#303450','#474D7B']}>
            <View style={styles.headerHGroup}>
                <Text style={styles.headerH2}>BTM Construtora</Text>
                <Text style={styles.headerH1}>Diário da Obra</Text>
            </View>
        </LinearGradient>
    );
};

export default Header;
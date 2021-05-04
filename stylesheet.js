import {StyleSheet, Platform, StatusBar} from 'react-native';

const styles = StyleSheet.create({
    safeAreaView: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    },
    title: {
        backgroundColor: 'blue'
    }
});

export default styles;
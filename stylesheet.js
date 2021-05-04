import {StyleSheet, Platform, StatusBar,Dimensions, PixelRatio} from 'react-native';

const vw = Dimensions.get('window').width/100;
const vh = Dimensions.get('window').height/100;

const scale = 100*vw/360;

export function normalize(size) {
    const newSize = size * scale 
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    }

    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
}

const styles = StyleSheet.create({
    safeAreaView: {
        paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        display: 'flex',
        alignItems: 'center',
    },
    header: {
        width: 100*vw,
        height: 16*vh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 6*vw,
        borderBottomRightRadius: 6*vw,
    },
    headerHGroup: {
        textAlign: 'right',
    },
    headerH1: {
        fontSize: normalize(22),
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Open Sans',
    },
    headerH2: {
        fontSize: normalize(12),
        color: 'white',
        textAlign: 'right',
        fontFamily: 'Open Sans',
    },
    textInput: {
        width: 82*vw,
        height: 7.8*vh,
        borderColor: '#C2CFD6',
        borderWidth: 1.6,
        borderStyle: 'solid',
        borderRadius: 4,
    },
    button: {
        width: 7*vh,
        height: 7*vh,
        borderRadius: 7/2*vh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonImg: {
        width: 3*vh,
        height: 3*vh,
        color: 'white',
    },
    addButton: {
        backgroundColor: '#BF9135',
    },
    editButton: {
        backgroundColor: '#81A8BC',
    },
    removeButton: {
        backgroundColor: '#BCBCBC',
    }
});

export default styles;
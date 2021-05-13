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
        height: 100*vh + (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight),
        position: 'relative',
        paddingLeft: 9*vw,
        paddingRight: 9*vw,
    },
    header: {
        width: 100*vw,
        height: 16*vh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 6*vw,
        borderBottomRightRadius: 6*vw,
        marginBottom: 4*vh,
    },
    headerHGroup: {
        textAlign: 'right',
    },
    headerH1: {
        fontSize: normalize(22),
        color: 'white',
        fontFamily: 'OpenSans-Bold',
    },
    headerH2: {
        fontSize: normalize(12),
        color: 'white',
        textAlign: 'right',
        fontFamily: 'OpenSans',
    },
    title: {
        color: '#474D7B',
        fontFamily: 'OpenSans-Bold',
        fontSize: 22,
        alignSelf: 'flex-start',
        paddingTop: 20,
        paddingBottom: 10,
    },
    subtitle: {

    },
    label: {
        color: '#C2CFD6',
        alignSelf: 'flex-start',
        fontFamily: 'OpenSans-Bold',
        fontSize: 15,
        paddingBottom: 10,
        paddingTop: 25,
    },
    textInput: {
        height: 7.8*vh,
        borderColor: '#C2CFD6',
        borderWidth: 1.6,
        borderStyle: 'solid',
        borderRadius: 4,
        paddingLeft: 5*vw,
        paddingRight: 20,
        fontSize: normalize(20),
        fontFamily: 'OpenSans',
        flex: 1,
    },
    textInputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        height: 7.8*vh,
        borderColor: '#C2CFD6',
        borderWidth: 1.6,
        borderStyle: 'solid',
        borderRadius: 4,
        paddingLeft: 30+8*vw,
        paddingRight: 20,
        fontSize: normalize(20),
        fontFamily: 'OpenSans',
        flex: 1,
    },
    searchImg: {
        width: 3*vh,
        height: 3*vh,
        position: 'absolute',
        left: 20,
    },
    buttonList: {
        position: 'absolute',
        right: 4*vw,
        bottom: 4*vh,
    },
    button: {
        width: 7*vh,
        height: 7*vh,
        borderRadius: 7/2*vh,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonImg: {
        width: 3*vh,
        height: 3*vh,
    },
    addButton: {
        backgroundColor: '#BF9135',
    },
    editButton: {
        backgroundColor: '#81A8BC',
    },
    removeButton: {
        backgroundColor: '#BCBCBC',
    },
    arrowButton: {
        width: 35,
        height: 35,
        alignSelf: 'flex-start',
    },
    floatButton: {
        position: 'absolute',
        right: -3.5*vh,
        bottom: -3.5*vh,
    },
    submitButton: {
        backgroundColor: '#474D7B',
        padding: 15,
        width: 82*vw,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 50,
    },
    submitButtonH1: {
        color: 'white',
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
    },
    buildingList: {
        paddingTop: 4*vh,
        width: 82*vw,
        paddingBottom: 50,
        height: 75*vh,
    },
    building: {
        paddingBottom: 3*vh,
        alignItems: 'center',
    },
    buildingH1: {
        fontFamily: 'OpenSans',
        fontSize: 18,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'rgba(159, 159, 159, 0.25)',
        paddingTop: 2*vh,
        paddingBottom: 2*vh,
        paddingLeft: 10*vw,
        paddingRight: 10*vw,
        minWidth: 60*vw,
        textAlign: 'center',
    }
});

export default styles;
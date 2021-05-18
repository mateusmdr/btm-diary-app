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
        height: 100*vh,
        position: 'relative',
        paddingLeft: 9*vw,
        paddingRight: 9*vw,
    },
    bold: {
        fontFamily: 'OpenSans-Bold',
        fontWeight: 'bold',
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
        color: '#C2CFD6',
        fontSize: 18,
        fontFamily: 'OpenSans',
        alignSelf: 'flex-start',
        paddingTop: 15,
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
    },
    diaryList: {
        paddingBottom: 5*vh,
        paddingTop: 30,
        maxHeight: 60*vh,
    },
    diary: {
        borderWidth: 2,
        borderRadius: 4,
        borderColor: 'rgba(159, 159, 159, 0.25)',
        width: 82*vw,
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 20,
    },
    diaryH1: {
        color: '#474D7B',
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
        alignSelf: 'flex-start',
    },
    diaryH2: {
        color: '#C2CFD6',
        fontFamily: 'OpenSans',
        paddingBottom: 5,
    },
    popUp : {
        width: 100*vw,
        height: 100*vh,
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertImg: {
        width: 60,
        height: 60,
    },
    confirmationDialog: {
        backgroundColor: 'white',
        width: 82*vw,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
        paddingBottom: 50,
        justifyContent: 'center',
        borderRadius: 5,
    },
    confirmationDialogMessage: {
        fontFamily: 'OpenSans',
        fontSize: 15,
        color: '#B3BFC6',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 40,
    },
    confirmationDialogView1: {
        width: 30*vw,
        marginRight: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#303450',
        color: '#303450',
    },
    confirmationDialogView2: {
        width: 30*vw,

        backgroundColor: '#303450',
        marginLeft: 10,
        borderRadius: 4,
    },
    confirmationDialogButton1: {
        textAlign: 'center',
        padding: 10,
        fontFamily: 'OpenSans-Bold',
    },
    confirmationDialogButton2: {
        textAlign: 'center',
        padding: 10,
        fontFamily: 'OpenSans-Bold',
        color: 'white',
    },
    errorDialog: {
        backgroundColor: 'white',
        width: 82*vw,
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 50,
        paddingBottom: 50,
        justifyContent: 'center',
        borderRadius: 5,
    },
    errorDialogMessage: {
        fontFamily: 'OpenSans',
        fontSize: 15,
        color: '#B3BFC6',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 40,
    },
    errorDialogView: {
        width: 30*vw,
        backgroundColor: '#303450',
        borderRadius: 4,
    },
    errorDialogButton: {
        textAlign: 'center',
        padding: 10,
        fontFamily: 'OpenSans-Bold',
        color: 'white',
    },
    addGaleryButton: {
        width: 25*vw,
        height: 25*vw,
        borderWidth: 2,
        borderColor: '#C2CFD6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginRight: 15
    },
    addGaleryImg: {
        width: 7*vw,
        height: 7*vw,
    },
    galeryList: {
        minWidth: 82*vw,
        height: 28*vw,
        marginTop: 10,
    },
    galeryImg: {
        width: 25*vw,
        height: 25*vw,
        borderRadius: 8,
        marginRight: 15,
    },
    diaryDescription: {
        fontFamily: 'OpenSans',
        fontSize: 16,
        color: '#C2CFD6',
        textAlign: 'justify',
        paddingTop: 20,
        alignSelf: 'flex-start',
        maxWidth: 40*vh,
    },
    textInputDiary: {
        height: 20*vh,
        width: 82*vw,
        borderColor: '#C2CFD6',
        borderWidth: 1.6,
        borderStyle: 'solid',
        borderRadius: 4,
        paddingLeft: 5*vw,
        paddingRight: 20,
        paddingTop: 20,
        marginTop: 10,
        marginBottom: 5,
        fontSize: normalize(20),
        fontFamily: 'OpenSans',
        backgroundColor: 'white',
    },
    floatButton2: {
        position: 'absolute',
        top: -15,
        right: 0,
        zIndex: 1,
        transform: [{scale: 3/4}]
    },
    dateInput: {
        backgroundColor: '#474D7B',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 5,
        minWidth: 70*vw,
    },
    dateInputText: {
        color: 'white',
        fontFamily: 'OpenSans-Bold',
        fontSize: 14,
    },
    dateSearchImg: {
        marginRight: 10,
    },
});

export default styles;
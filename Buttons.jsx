import React, {useEffect} from 'react';
import {StyleSheet,View, TouchableHighlight,TouchableWithoutFeedback, Text,TouchableOpacity,Image, FlatList} from 'react-native';
import styles from './assets/stylesheet.js';

import {AddImg,EditImg,RemoveImg,ArrowImg,AlertImg,XImg, SearchImg} from './assets/SvgComponents.jsx';

import * as ImagePicker from 'expo-image-picker';

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
        <View style={styles.dateInputContainer}>
            <TouchableHighlight onPress={props.onClick}>
                <View style={styles.dateInput}>
                    <SearchImg width={styles.searchImg.width} height={styles.searchImg.height} style={styles.dateSearchImg}/>
                    <Text style={styles.dateInputText}>{props.date}</Text>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const ImagePopUp = (props) => {
    return(
        props.uri && (
            <TouchableWithoutFeedback onPress={() => props.setImagePopUp(null)}>
                <View style={styles.popUp}>
                <TouchableWithoutFeedback>
                <View style={styles.imagePopUpContainer}>
                    <XButton onClick={() => props.setImagePopUp(null)}/>
                    <Image source={{uri: props.uri}} style={styles.imagePopUp}/>
                    {props.removeButton && (
                    <View style={styles.imageRemoveButton}>
                        <RemoveButton onClick={
                            () => {
                                const image = props.images.find(element => element.uri === props.uri);
                                const index = props.images.indexOf(image);
                                const firstPart = props.images.slice(0,index);
                                const lastPart = props.images.slice(index+1);
                                const updatedImages = firstPart.concat(lastPart);

                                props.setImages(updatedImages);
                                props.setImagePopUp(null);
                            }}
                        />
                    </View>
                    )}
                </View>
                </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    );
}

const GaleryImgList = (props) => {

    if(!props.addButton && props.images.length === 0){
        return null;
    }

    let addButton = [];
    if(props.addButton){
        addButton = [{uri: "addButton"}];
    }

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Erro: É necessário fornecer permissões de acesso à galeria do dispositivo');
            }
        })();
    }, []);

    const pickImage = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({ 
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
        });

        if (!result.cancelled) {
            const newImg = [{uri: result.uri}];
            props.setImages(newImg.concat(props.images));
        }
    }

    const renderImage = ({item}) => {
        if(item.uri === "addButton"){
            return (
                <AddGalery 
                    onClick={() => {
                        pickImage();
                    }}
                />
            );
        }

        return (
            <View>
                <TouchableWithoutFeedback onPress={()=> props.setImagePopUp(item.uri)}>
                    <Image source={{uri: item.uri}} style={styles.galeryImg}/>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    return (
        <View style={styles.galeryList}>
            <FlatList 
                data={addButton.concat(props.images)}
                renderItem={renderImage}
                keyExtractor={(item) => item.uri}
                horizontal={true}
            />
        </View>
    );
}

const SubmitButtons = (props) => {
    return (
        <View style={styles.submitButtonsView}>
            <TouchableOpacity onPress={props.onClick1}>
                <View style={styles.submitDialogView1}>
                    <Text style={styles.confirmationDialogButton1}>{props.titles[0]}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onClick2}>
                <View style={styles.submitDialogView2}>
                    <Text style={styles.confirmationDialogButton2}>{props.titles[1]}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

}

export {AddButton,EditButton,RemoveButton,ArrowButton,SubmitButton,ConfirmationDialog,ErrorDialog, AddGalery, XButton,DateInput,ImagePopUp, GaleryImgList, SubmitButtons};
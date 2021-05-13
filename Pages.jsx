import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableWithoutFeedback, SafeAreaView, TouchableWithoutFeedbackBase} from 'react-native';
import {AddButton, EditButton, ArrowButton, RemoveButton, SubmitButton, ConfirmationDialog} from './Buttons';
import {SearchBar} from './Inputs';
import Header from './Header';

import styles from './assets/stylesheet';

import {getWeekDay, getBuildingIndexById} from './lib/utilities.js';

const Page = (props) => {
    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Header/>
            {props.children}
        </SafeAreaView>
    );
}

const Building = (props) => {
    return(
        <TouchableWithoutFeedback 
            onPress={() => {
                props.setCurrentPage("viewBuilding");
                props.setCurrentBuilding(props.item);
            }}
        >
            <View style={styles.building} >
                <Text style={styles.buildingH1}>{props.item.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const HomePage = (props) => {

    const renderBuilding = ({item}) => {
        return(
            <Building 
                item={item} 
                setCurrentPage={props.setCurrentPage}
                setCurrentBuilding={props.setCurrentBuilding}
            />
        );
    };

    return(
        <Page>
            <SearchBar/>
            <View style={styles.buildingList}>
                <FlatList data={props.data} renderItem={renderBuilding}/>
            </View>
            <View style={styles.buttonList}>
                <AddButton onClick={() => props.setCurrentPage("addBuilding")}/>
            </View>
        </Page>
    );
}

const AddBuildingPage = (props) => {
    const [buildingName, updatebuildingName] = useState(null);
    return(
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("home")}/>
            <Text style={styles.title}>Cadastrar Obra</Text>
            <Text style={styles.label}>Nome da Obra</Text>
            <View style={styles.textInputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder=""
                    underlineColorAndroid="transparent"
                    onChangeText={updatebuildingName}
                />
            </View>
            <SubmitButton 
                title="Cadastrar" 
                onClick={() => {
                    if(buildingName){
                        let time = new Date().getTime();
                        props.setBuildings(props.data.concat({name: buildingName, key: time.toString()}));
                        props.setCurrentPage("home");
                    }
                }}
            />
        </Page>
    );
}

const EditBuildingPage = (props) => {
    const [buildingName, setBuildingName] = useState(null);

    const [popUp, setPopUp] = useState(false);

    const currentBuildingIndex = getBuildingIndexById(props.buildings, props.currentBuilding.key);
    
    function removeBuilding(){
        props.setCurrentPage("home");
    }
    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")} />
            <Text style={styles.title}>Editar Obra</Text>
            <Text style={styles.label}>Nome da Obra</Text>
            <View style={styles.textInputView}>
                <TextInput
                    style={styles.textInput}
                    placeholder={props.currentBuilding.name}
                    underlineColorAndroid="transparent"
                    onChangeText={setBuildingName}
                />
                <View style={styles.floatButton}>
                    <RemoveButton onClick={() => setPopUp(true)}/>
                </View>
            </View>
            <SubmitButton
                title="Editar" 
                onClick={() => {
                    if(buildingName){

                        let updatedBuildings = props.buildings;
                        updatedBuildings[currentBuildingIndex].name = buildingName;

                        props.setBuildings(updatedBuildings);
                        props.setCurrentPage("home");
                    }
                }}
            />
            {popUp ? (<ConfirmationDialog
                actions = {[() => removeBuilding,() => setPopUp(false)]}
                titles = {["Deletar", "Cancelar"]}
                message = {(
                    <Text style={styles.confirmationDialogMessage}>
                        Você tem certeza que deseja <Text style={styles.bold}>deletar</Text> a obra <Text style={styles.bold}>“Nome da Obra”</Text> e todas as anotações sobre ela?
                    </Text>
                )}
            />) : null}
        </Page>
    );
}

const Diary = (props) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.setCurrentPage("viewDiary");
                props.setCurrentDiary(props.item);
            }}
        >
            <View style={styles.diary}>
                <Text style={styles.diaryH2}>{props.item.description}</Text>
                <Text style={styles.diaryH1}>{props.item.date}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const ViewBuildingPage = (props) => {
    const renderDiary = ({item}) => {
        return(
            <Diary 
                item={item} 
                setCurrentPage={props.setCurrentPage}
                setCurrentDiary={props.setCurrentDiary}
            />
        );
    };
    return(
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("home")}/>
            <Text style={styles.title}>{props.currentBuilding.name}</Text>
            <SearchBar/>
            <View style={styles.diaryList}>
                <FlatList data={props.currentBuilding.diaries} renderItem={renderDiary}/>
            </View>
            <View style={styles.buttonList}>
                <EditButton onClick={() => props.setCurrentPage("editBuilding")}/>
                <AddButton onClick={() => props.setCurrentPage("addDiary")}/>
            </View>
        </Page>
    );
}

const ViewDiaryPage = (props) => {
    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")} />
        </Page>
    );
}

const AddDiaryPage = (props) => {
    const date = new Date();
    const weekDay = getWeekDay(date);
    const currentDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + " (" + weekDay + ")";
    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")}/>
            <Text style={styles.title}>{props.currentBuilding.name}</Text>
            <Text style={styles.diaryH1}>{currentDate}</Text>
            <Text style={styles.subtitle}>Galeria</Text>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput} placeholder="Descrição"/>
            </View>
        </Page>
    );
}

export {HomePage, AddBuildingPage,ViewBuildingPage, EditBuildingPage, AddDiaryPage, ViewDiaryPage};
import React, {useState} from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import {AddButton, EditButton, ArrowButton, RemoveButton, SubmitButton} from './Buttons';
import {SearchBar} from './Inputs';
import Header from './Header';

import styles from './assets/stylesheet';
import { TextInput } from 'react-native-gesture-handler';

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

function getBuildingIndexById(buildings,key) {

    const index = buildings.findIndex(element => element.key === key);

    return index;
}

const Diary = (props) => {

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

const ViewBuildingPage = (props) => {
    return(
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("home")}/>
            <Text style={styles.title}>{props.currentBuilding.name}</Text>
            <SearchBar/>
            <View style={styles.buttonList}>
                <EditButton onClick={() => props.setCurrentPage("editBuilding")}/>
                <AddButton onClick={() => props.setCurrentPage("addDiary")}/>
            </View>
        </Page>
    );
}

const EditBuildingPage = (props) => {
    const [buildingName, updatebuildingName] = useState(null);

    const currentBuildingIndex = getBuildingIndexById(props.buildings, props.currentBuilding.key);
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
                    onChangeText={updatebuildingName}
                />
                <View style={styles.floatButton}>
                    <RemoveButton onClick={() => props.setCurrentPage("home")}/>
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
    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")}/>
        </Page>
    );
}

export {HomePage, AddBuildingPage,ViewBuildingPage, EditBuildingPage, AddDiaryPage, ViewDiaryPage};
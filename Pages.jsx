import React from 'react';
import {View, Text, FlatList, TouchableWithoutFeedback, SafeAreaView} from 'react-native';
import {AddButton, ArrowButton, RemoveButton} from './Buttons';
import {SearchBar} from './Inputs';
import Header from './Header';

import styles from './assets/stylesheet';

const Page = (props) => {
    <SafeAreaView style={styles.safeAreaView}>
        <Header/>
        {props.children}
    </SafeAreaView>
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

const AddBuildingPage = () => {
    return(
        <Page>
            <Text>Cadastrar Obra</Text>
            <View style={styles.buttonList}>
                <AddButton onClick={() => props.setCurrentPage("addBuilding")}/>
            </View>
        </Page>
    );
}

const ViewBuildingPage = (props) => {
    return(
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("home")}/>
            <Text>{props.currentBuilding.name}</Text>
            <SearchBar/>
            <View style={styles.buttonList}>
                <EditButton onClick={props.setCurrentPage("editBuilding")}/>
                <AddButton onClick={() => props.setCurrentPage("addDiary")}/>
            </View>
        </Page>
    );
}

const EditBuildingPage = (props) => {
    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")} />
            <Text>Editar Obra</Text>
            <RemoveButton/>
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
            <ArrowButton onClick={() => props.setCurrentPage("addDiary")}/>
        </Page>
    );
}

export {HomePage, AddBuildingPage,ViewBuildingPage, EditBuildingPage, AddDiaryPage, ViewDiaryPage};
import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {AddButton} from './Buttons';
import {SearchBar} from './Inputs';
import Header from './Header';

import styles from './assets/stylesheet';

const HomePage = (props) => {

    const renderBuilding = ({item}) => {
        return(
            <View style={styles.building}>
                <Text style={styles.buildingH1}>{item.name}</Text>
            </View>
        );
    };

    return(
        <>
            <Header/>
            <SearchBar/>
            <View style={styles.buildingList}>
                <FlatList data={props.data} renderItem={renderBuilding}/>
            </View>
            <View style={styles.buttonList}>
                <AddButton onClick={() => props.setCurrentPage("addBuilding")}/>
            </View>
        </>
    );
}

const AddBuildingPage = () => {
    return(
        <>
            <Header/>
            <Text>Cadastrar Obra</Text>
            <View style={styles.buttonList}>
                <AddButton onClick={() => props.setCurrentPage("addBuilding")}/>
            </View>
        </>
    );
}

export {HomePage, AddBuildingPage};
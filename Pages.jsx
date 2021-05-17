import React, {useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableWithoutFeedback, SafeAreaView, ScrollView} from 'react-native';
import {AddButton, EditButton, ArrowButton, RemoveButton, SubmitButton, ConfirmationDialog,ErrorDialog, AddGalery} from './Buttons';
import {SearchBar} from './Inputs';
import Header from './Header';

import styles from './assets/stylesheet';

import {getFullDate, getBuildingIndexById} from './lib/utilities.js';

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
    const [textInput, setTextInput] = useState("");

    const renderBuilding = ({item}) => {
        return(
            (item.name.toLowerCase().includes(textInput.toLowerCase()) || !textInput) ?
                (<Building 
                    item={item} 
                    setCurrentPage={props.setCurrentPage}
                    setCurrentBuilding={props.setCurrentBuilding}
                />)
            : null
        );
    };

    return(
        <Page>
            <SearchBar onChangeText={setTextInput}/>
            <View style={styles.buildingList}>
                <FlatList 
                    data={props.buildings} 
                    renderItem={renderBuilding}
                    keyExtractor={(item) => item.name}
                />
            </View>
            <View style={styles.buttonList}>
                <AddButton onClick={() => props.setCurrentPage("addBuilding")}/>
            </View>
        </Page>
    );
}

const AddBuildingPage = (props) => {
    const [textInput, setTextInput] = useState("");

    const [existsPopUp, setExistsPopUp] = useState(false);
    const [emptyPopUp, setEmptyPopUp] = useState(false);

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
                    onChangeText={setTextInput}
                />
            </View>
            <SubmitButton 
                title="Cadastrar" 
                onClick={() => {
                    //Text input is empty
                    if(!textInput){
                        setEmptyPopUp(true);
                        return null;
                    } 
                    
                    //Building name already exists
                    if(props.buildings.find(element => element.name === textInput)){ 
                        setExistsPopUp(true);
                        return null;
                    }

                    //Everything is fine
                    props.setBuildings(props.buildings.concat({name: textInput}));
                    props.setCurrentPage("home");
                }}
            />
            <ErrorDialog
                onClick={()=> setEmptyPopUp(false)}
                message= {(
                    <Text style={styles.errorDialogMessage}><Text style={styles.bold}>Erro:</Text> Nenhum nome foi fornecido</Text>
                )}
                condition={emptyPopUp}
            />
            <ErrorDialog
                onClick={() => setExistsPopUp(false)}
                message= {(
                    <Text style={styles.errorDialogMessage}><Text style={styles.bold}>Erro:</Text> Já existe uma obra com este nome</Text>
                )}
                condition={existsPopUp}
            />
        </Page>
    );
}

const EditBuildingPage = (props) => {
    const [textInput, setTextInput] = useState("");

    const [existsPopUp, setExistsPopUp] = useState(false);
    const [emptyPopUp, setEmptyPopUp] = useState(false);
    const [removePopUp, setRemovePopUp] = useState(false);

    const currentBuildingIndex = getBuildingIndexById(props.buildings, props.currentBuilding.key);
    
    function removeBuilding(){
        let updatedBuildings = 
        (props.buildings.slice(0,currentBuildingIndex))
            .concat(props.buildings.slice(currentBuildingIndex + 1));
        
        props.setBuildings(updatedBuildings);
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
                    onChangeText={setTextInput}
                />
                <View style={styles.floatButton}>
                    <RemoveButton onClick={() => setRemovePopUp(true)}/>
                </View>
            </View>
            <SubmitButton
                title="Editar" 
                onClick={() => {
                    //Text input is empty
                    if(!textInput){
                        setEmptyPopUp(true);
                        return null;
                    } 
                    
                    //Building name already exists
                    if((props.buildings.find(element => element.name === textInput))&& textInput != props.currentBuilding.name){ 
                        setExistsPopUp(true);
                        return null;
                    }

                    //Everything is fine
                    let updatedBuildings = props.buildings;
                    updatedBuildings[currentBuildingIndex].name = textInput;

                    props.setBuildings(updatedBuildings);
                    props.setCurrentPage("home");
                }}
            />
            <ConfirmationDialog
                actions = {[() => removeBuilding(),() => setRemovePopUp(false)]}
                titles = {["Deletar", "Cancelar"]}
                message = {(
                    <Text style={styles.confirmationDialogMessage}>
                        Você tem certeza que deseja <Text style={styles.bold}>deletar</Text> a obra <Text style={styles.bold}>“{props.currentBuilding.name}”</Text> e todas as anotações sobre ela?
                    </Text>
                )}
                condition={removePopUp}
            />

            <ErrorDialog
                onClick={()=> setEmptyPopUp(false)}
                message= {(
                    <Text style={styles.errorDialogMessage}><Text style={styles.bold}>Erro:</Text> Nenhum nome foi fornecido</Text>
                )}
                condition={emptyPopUp}
            />
            <ErrorDialog
                onClick={() => setExistsPopUp(false)}
                message= {(
                    <Text style={styles.errorDialogMessage}><Text style={styles.bold}>Erro:</Text> Já existe uma obra com este nome</Text>
                )}
                condition={existsPopUp}
            />
        </Page>
    );
}

const Diary = (props) => {
    const date = new Date(props.item.date);
    const currentDate = getFullDate(date);
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.setCurrentPage("viewDiary");
                props.setCurrentDiary(props.item);
            }}
        >
            <View style={styles.diary}>
                <Text style={styles.diaryH2}>{props.item.description}</Text>
                <Text style={styles.diaryH1}>{currentDate}</Text>
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
                <FlatList 
                    data={props.currentBuilding.diaries} 
                    renderItem={renderDiary}
                    keyExtractor={(item) => {
                        const date = new Date(item.date);

                        return date.toLocaleDateString();
                    }}
                />
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
            <AddGalery/>
        </Page>
    );
}

const AddDiaryPage = (props) => {
    const date = new Date();    
    const currentDate = getFullDate(date);
    
    const [description, setDescription] = useState("");
    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")}/>
            <Text style={styles.title}>{props.currentBuilding.name}</Text>
            <Text style={styles.diaryH1}>{currentDate}</Text>
            <Text style={styles.subtitle}>Galeria</Text>
            <View style={styles.addGaleryScrollView}>
                <ScrollView horizontal={true}>
                    <AddGalery/>
                    <AddGalery/>
                    <AddGalery/>
                    <AddGalery/>
                    <AddGalery/>
                </ScrollView>
            </View>
            <View style={styles.textInputView}>
                <TextInput 
                    style={styles.textInput} 
                    placeholder="Descrição"
                    onChangeText={setDescription}
                />
            </View>
            <SubmitButton 
                title="Salvar" 
                onClick={() => {
                    props.setCurrentPage("viewBuilding");
                    //props.setCurrentBuilding(props.currentBuilding.concat())
                }}
            />
        </Page>
    );
}

export {HomePage, AddBuildingPage,ViewBuildingPage, EditBuildingPage, AddDiaryPage, ViewDiaryPage};
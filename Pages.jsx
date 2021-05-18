import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, FlatList, TouchableWithoutFeedback, SafeAreaView, Image, KeyboardAvoidingView} from 'react-native';
import {AddButton, EditButton, ArrowButton, RemoveButton, SubmitButton, ConfirmationDialog,ErrorDialog, AddGalery,DateInput} from './Buttons';
import {SearchBar} from './Inputs';
import Header from './Header';

import styles from './assets/stylesheet';

import {getFullDate,getWeekDay} from './lib/utilities.js';

import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

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
                    try{
                        props.addBuilding({name: textInput, diaries: []});
                        props.setCurrentPage("home");
                    }catch (err){
                        //Input is empty
                        if(err === "empty"){
                            setEmptyPopUp(true);
                            return;
                        }

                        //Building name already exists
                        if(err === "exists"){
                            setExistsPopUp(true);
                            return;
                        }
                    }
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

const Diary = (props) => {
    const date = new Date(props.item.date);
    const fullDate = getFullDate(date);
    const weekDay = getWeekDay(date);
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.setCurrentPage("viewDiary");
                props.setCurrentDiary(props.item);
            }}
        >
            <View style={styles.diary}>
                <Text numberOfLines={2} style={styles.diaryH2}>{props.item.description}</Text>
                <Text style={styles.diaryH1}>{fullDate + " ("+ weekDay + ")"}</Text>
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
                    keyExtractor={(item) => getFullDate(new Date(item.date))}
                />
            </View>
            <View style={styles.buttonList}>
                <EditButton onClick={() => props.setCurrentPage("editBuilding")}/>
                <AddButton onClick={() => props.setCurrentPage("addDiary")}/>
            </View>
        </Page>
    );
}

const EditBuildingPage = (props) => {
    const [textInput, setTextInput] = useState("");

    const [existsPopUp, setExistsPopUp] = useState(false);
    const [emptyPopUp, setEmptyPopUp] = useState(false);
    const [removePopUp, setRemovePopUp] = useState(false);
    

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
                    try{
                        props.editBuilding({name: textInput});
                        props.setCurrentPage("home");
                    }catch (err){
                        //Input is empty
                        if(err === "empty"){
                            setEmptyPopUp(true);
                        }

                        //Building name already exists
                        if(err === "exists"){
                            setExistsPopUp(true);
                        }
                    }
                }}
            />
            <ConfirmationDialog
                actions = {[
                    () => {
                        props.removeBuilding(); 
                        props.setCurrentPage("home");
                    },
                    () => setRemovePopUp(false)
                ]}
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

const AddDiaryPage = (props) => {
    const [date, setDate] = useState(new Date());
    
    const [description, setDescription] = useState("");

    const [images, setImages] = useState([]);

    const [calendarPopUp, setCalendarPopUp] = useState(false);

    const [existsPopUp, setExistsPopUp] = useState(false);
    const [emptyPopUp, setEmptyPopUp] = useState(false);

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
            setImages(images.concat({uri: result.uri}));
        }
    }

    const addButton = [{uri: "addButton"}];

    const renderImage = ({item,index}) => {
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
                    <View style={styles.floatButton2}>
                    <RemoveButton 
                        onClick={() => {
                            const firstPart = images.slice(0,index-1);
                            const lastPart = images.slice(index);
                            const updatedImages = firstPart.concat(lastPart);

                            setImages(updatedImages);
                        }}
                    />
                    </View>
                    <Image source={{uri: item.uri}} style={styles.galeryImg}/>
                </View>
            );
    }

    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")}/>
            <Text style={styles.title}>{props.currentBuilding.name}</Text>
            <DateInput
                onClick={()=> setCalendarPopUp(true)}
                date={getFullDate(date) + " (" + getWeekDay(date) + ")"}
            />
            {calendarPopUp && (
                <DateTimePicker 
                    mode={"date"}
                    value={date}
                    onChange={(event,value) =>{
                        if(event.type==="set"){
                            setCalendarPopUp(false);
                            setDate(value);
                        }
                        if(event.type==="dismissed"){
                            setCalendarPopUp(false);
                        }
                    }}
                    maximumDate={new Date()}
                />
            )}
            <Text style={styles.subtitle}>Galeria</Text>
            <View style={styles.galeryList}>
                <FlatList 
                    data={addButton.concat(images)}
                    renderItem={renderImage}
                    keyExtractor={(item) => item.uri}
                    horizontal={true}
                />
            </View>

            <KeyboardAvoidingView 
                style={styles.textInputView}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TextInput 
                    style={styles.textInputDiary} 
                    placeholder="Descrição"
                    onChangeText={setDescription}
                    multiline={true}
                    textAlignVertical= "top"
                />
            </KeyboardAvoidingView>
            <SubmitButton 
                title="Salvar" 
                onClick={() => {
                    try{
                        props.addDiary({
                            date: date.toDateString(), 
                            description: description,
                            images: images
                        });
                        props.setCurrentPage("viewBuilding");
                    }catch(err){
                        if(err==="exists") {
                            setExistsPopUp(true);
                            return;
                        }
                        if(err==="empty"){
                            setEmptyPopUp(true);
                        }
                    }
                }}
            />
            <ErrorDialog
                onClick={()=> setEmptyPopUp(false)}
                message= {(
                    <Text style={styles.errorDialogMessage}><Text style={styles.bold}>Erro:</Text> Nenhuma descrição foi fornecida</Text>
                )}
                condition={emptyPopUp}
            />
            <ErrorDialog
                onClick={() => setExistsPopUp(false)}
                message= {(
                    <Text style={styles.errorDialogMessage}><Text style={styles.bold}>Erro:</Text> Já existe um diário referente a esta data</Text>
                )}
                condition={existsPopUp}
            />
        </Page>
    );
}

const ViewDiaryPage = (props) => {
    const date = new Date(props.currentDiary.date);
    const diaryDate = getFullDate(date) + " ("+ getWeekDay(date) + ")";

    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewBuilding")} />
            <Text style={styles.title}>{props.currentBuilding.name}</Text>
            <Text style={styles.diaryH1}>{diaryDate}</Text>

            {props.currentDiary.images.length ? (
                <View style={styles.galeryList}>
                    <FlatList 
                        data={props.currentDiary.images}
                        renderItem={({item}) => <Image source={{uri: item.uri}} style={styles.galeryImg}/>}
                        keyExtractor={(item) => item.uri}
                        horizontal={true}
                    />
                </View>
            ): null}
            <Text style={styles.diaryDescription}>{props.currentDiary.description}</Text>
            
            <View style={styles.buttonList}>
                <EditButton onClick={() => props.setCurrentPage("editDiary")}/>
            </View>
        </Page>
    );
}

const EditDiaryPage = (props) => {
    return (
        <Page>
            <ArrowButton onClick={() => props.setCurrentPage("viewDiary")}/>
        </Page>
    )
}

export {HomePage, AddBuildingPage,ViewBuildingPage, EditBuildingPage, AddDiaryPage, ViewDiaryPage, EditDiaryPage};
import React, {useState,useEffect} from 'react';
import {useFonts} from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage'

/*Pages*/
import {HomePage,AddBuildingPage,ViewBuildingPage, EditBuildingPage, ViewDiaryPage, AddDiaryPage, EditDiaryPage} from './Pages';

import initialBuildings from './assets/buildings.json';

const App = () => {
  const [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const [buildings, setBuildings] = useState([]);

  const [currentPage, setCurrentPage] = useState("home");

  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [currentDiary, setCurrentDiary] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('buildings')
      return jsonValue != null ? JSON.parse(jsonValue) : initialBuildings;
    } catch(e) {
      // error reading value
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('buildings', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  useEffect(() => {
    getData().then((data)=>setBuildings(data)); // Read stored data once app renders
  }, [])

  

  const addBuilding = (newBuilding) => {
    if(!newBuilding.name){
      throw "empty";
    }

    if (buildings.find(element => element.name === newBuilding.name)){
      throw "exists";
    }

    setBuildings(buildings.concat(newBuilding));
    storeData(buildings);
  }
  
  const editBuilding = (newBuilding) => {
    if(!newBuilding.name){
      throw "empty";
    }

    if (buildings.find(element => element.name === newBuilding.name) && currentBuilding.name !== newBuilding.name){
      throw "exists";
    }

    const currentBuildingIndex = buildings.findIndex(element => element.name === currentBuilding.name);

    const updatedBuilding = Object.assign(buildings[currentBuildingIndex],newBuilding);
    const updatedBuildings = Object.assign(buildings,{[currentBuildingIndex] : updatedBuilding})


    setBuildings(updatedBuildings);
    setCurrentBuilding(updatedBuilding);

    storeData(buildings);
  }

  const removeBuilding = () => {
    const currentBuildingIndex = buildings.findIndex(element => element.name === currentBuilding.name);

    const firstPart = buildings.slice(0,currentBuildingIndex);
    const lastPart = buildings.slice(currentBuildingIndex+1);
    const updatedBuildings = firstPart.concat(lastPart);
    
    setBuildings(updatedBuildings);

    storeData(buildings);
  }

  const addDiary = (newDiary) => {

    if(newDiary.description === "") {
      throw "empty";
    }

    const currentDiaries = currentBuilding.diaries;

    if (currentDiaries.find(element => element.date === newDiary.date)){
      throw "exists";
    }

    const updatedDiaries = currentDiaries.concat(newDiary);

    const updatedBuilding = {...currentBuilding,...{diaries: updatedDiaries}};

    editBuilding(updatedBuilding); // Apply changes to main array (buildings)

    storeData(buildings);
  }

  const editDiary = (newDiary) => {
    const currentDiaryIndex = currentBuilding.diaries.findIndex(element => element.date === currentDiary.date);

    if(newDiary.description === "") {
      throw "empty";
    }

    if(newDiary.date !== currentDiary.date && currentBuilding.diaries.find((element) => element.date === newDiary.date)){
      throw "exists";
    }

    let updatedDiaries = currentBuilding.diaries;
    updatedDiaries[currentDiaryIndex] = newDiary;

    let updatedBuilding = currentBuilding;
    updatedBuilding.diaries = updatedDiaries;

    editBuilding(updatedBuilding); // Apply changes to main array (buildings)
    setCurrentDiary(newDiary);

    storeData(buildings);
  }

  const removeDiary = () => {
    const currentDiaryIndex = currentBuilding.diaries.findIndex(element => element.date === currentDiary.date);
    let updatedDiaries = currentBuilding.diaries;

    const firstPart = updatedDiaries.slice(0,currentDiaryIndex);
    const lastPart = updatedDiaries.slice(currentDiaryIndex+1);
    updatedDiaries = firstPart.concat(lastPart);

    let updatedBuilding = currentBuilding;
    updatedBuilding.diaries = updatedDiaries;

    editBuilding(updatedBuilding); // Apply changes to main array (buildings)

    storeData(buildings);
  }

  if (!loaded) return null;

  if (currentPage === "home" ){
    return (
      <HomePage 
        buildings={buildings} 
        setCurrentPage={setCurrentPage}
        setCurrentBuilding={setCurrentBuilding}
      />
    );
  }

  if (currentPage === "addBuilding"){
    return(
      <AddBuildingPage 
        buildings={buildings} 
        setCurrentPage={setCurrentPage}
        addBuilding={addBuilding}
      />
    );
  }

  if (currentPage === "viewBuilding"){
    return(
      <ViewBuildingPage 
        setCurrentPage={setCurrentPage}
        currentBuilding={currentBuilding}
        setCurrentDiary={setCurrentDiary} 
      />
    )
  }

  if (currentPage === "editBuilding"){
    return (
      <EditBuildingPage
        setCurrentPage={setCurrentPage}
        currentBuilding={currentBuilding}
        editBuilding={editBuilding}
        removeBuilding={removeBuilding}
      />
    )
  }

  if (currentPage === "addDiary"){
    return (
      <AddDiaryPage
        setCurrentPage={setCurrentPage}
        currentBuilding={currentBuilding}
        addDiary={addDiary}
      />
    );
  }

  if (currentPage === "viewDiary") {
    return (
      <ViewDiaryPage
        setCurrentPage={setCurrentPage}
        currentBuilding={currentBuilding}
        currentDiary={currentDiary}
      />
    );
  }

  if (currentPage === "editDiary") {
    return (
      <EditDiaryPage
        setCurrentPage={setCurrentPage}
        currentBuilding={currentBuilding}
        currentDiary={currentDiary}
        editDiary={editDiary}
        removeDiary={removeDiary}
      />
    );
  }
  
  return null;
}

export default App;
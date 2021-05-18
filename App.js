import React, {useState} from 'react';
import {useFonts} from 'expo-font';

/*Pages*/
import {HomePage,AddBuildingPage,ViewBuildingPage, EditBuildingPage, ViewDiaryPage, AddDiaryPage, EditDiaryPage} from './Pages';

import initialBuildings from './assets/buildings.json';

const App = () => {
  const [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const [buildings, setBuildings] = useState(initialBuildings);

  const [currentPage, setCurrentPage] = useState("home");

  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [currentDiary, setCurrentDiary] = useState(null);

  const addBuilding = (newBuilding) => {
    if(!newBuilding.name){
      throw "empty";
    }

    if (buildings.find(element => element.name === newBuilding.name)){
      throw "exists";
    }

    setBuildings(buildings.concat(newBuilding));
    //TODO: WRITE CHANGES TO JSON FILE
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

    //TODO: WRITE CHANGES TO JSON FILE
  }

  const removeBuilding = () => {
    const currentBuildingIndex = buildings.findIndex(element => element.name === currentBuilding.name);

    const firstPart = buildings.slice(0,currentBuildingIndex);
    const lastPart = buildings.slice(currentBuildingIndex+1);
    const updatedBuildings = firstPart.concat(lastPart);
    
    setBuildings(updatedBuildings);

    //TODO: WRITE CHANGES TO JSON FILE
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

    setCurrentBuilding(updatedBuilding); // Apply changes to main array (buildings)
  }

  const editDiary = (newDiary) => {
    const currentDiaryIndex = diaries.findIndex(element => element.date === currentDiary.date);
    let updatedDiaries = currentBuilding.diaries;
    updatedDiaries[currentDiaryIndex] = newDiary;

    let updatedBuilding = currentBuilding;
    updatedBuilding.diaries = updatedDiaries;

    editBuilding(updatedBuilding); // Apply changes to main array (buildings)
  }

  const removeDiary = () => {
    const currentDiaryIndex = diaries.findIndex(element => element.date === currentDiary.date);
    let updatedDiaries = currentBuilding.diaries[currentDiaryIndex];

    const firstPart = updatedDiaries.slice(0,currentDiaryIndex);
    const lastPart = updatedDiaries.slice(currentDiaryIndex+1);
    updatedDiaries = firstPart.concat(lastPart);

    let updatedBuilding = currentBuilding;
    updatedBuilding.diaries = updatedDiaries;

    editBuilding(updatedBuilding); // Apply changes to main array (buildings)
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
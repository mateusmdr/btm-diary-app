import React, {useState} from 'react';
import {useFonts} from 'expo-font';

/*Pages*/
import {HomePage,AddBuildingPage,ViewBuildingPage, EditBuildingPage, ViewDiaryPage, AddDiaryPage} from './Pages';

import initialBuildings from './assets/buildings.json';

const App = function App() {
  const [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const [buildings, setBuildings] = useState(initialBuildings);

  const [currentPage, setCurrentPage] = useState("home");

  const [currentBuilding, setCurrentBuilding] = useState(null);
  const [currentDiary, setCurrentDiary] = useState(0);

  if (!loaded) return null;

  if (currentPage === "home" ){
    return (
      <HomePage 
        data={buildings} 
        setCurrentPage={setCurrentPage}
        setCurrentBuilding={setCurrentBuilding}
      />
    );
  }

  if (currentPage === "addBuilding"){
    return(
      <AddBuildingPage 
        data={buildings} 
        setCurrentPage={setCurrentPage}
        setBuildings={setBuildings}
      />
    );
  }

  if (currentPage === "viewBuilding"){
    return(
      <ViewBuildingPage 
        setCurrentPage={setCurrentPage} 
        currentBuilding={currentBuilding}        
      />
    )
  }

  if (currentPage === "editBuilding"){
    return (
      <EditBuildingPage
        setCurrentPage={setCurrentPage}
        setBuildings={setBuildings}
        buildings={buildings}
        currentBuilding={currentBuilding}
      />
    )
  }

  if (currentPage === "addDiary"){
    return (
      <AddDiaryPage
        setCurrentPage={setCurrentPage}
        currentBuilding={currentBuilding}
      />
    );
  }

  if (currentPage === "viewDiary") {
    return (
      <ViewDiaryPage
        setCurrentPage={setCurrentPage}
      />
    );
  }
  
  return null;
}

export default App;
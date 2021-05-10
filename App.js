import React, {useState} from 'react';
import {useFonts} from 'expo-font';

/*Pages*/
import {HomePage,AddBuildingPage,ViewBuildingPage, EditBuildingPage, ViewDiaryPage, AddDiaryPage} from './Pages';

import styles from './assets/stylesheet.js';

const App = function App() {
  const [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const initialBuildings = [
    {
      "key": "1",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "2",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "3",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "4",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "5",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "6",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "7",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "8",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "9",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    },
    {
      "key": "10",
      "name": "Nome da Obra",
      "diaries": [
        {
          "date": "Data do diário",
          "description": "Descrição do diário",
          "images": [
            "Imagem 1",
            "Imagem 2"
          ]
        }
      ]
    }
  ];

  const [buildings, updateBuildings] = useState(initialBuildings);

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
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useFonts} from 'expo-font';
import $ from 'jquery';

/*Pages*/
import {HomePage,AddBuildingPage} from './Pages';

import styles from './assets/stylesheet.js';

const App = function App() {
  const [loaded] = useFonts({
    'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  const initialBuildings = [
    {
      "key": "1",
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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
      "name": "Nome da obra",
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

  if (!loaded) return null;

  if (currentPage === "home" ){
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <HomePage data={buildings} setCurrentPage={(newPage) => setCurrentPage(newPage)}/>
      </SafeAreaView>
    );
  }

  if (currentPage === "addBuilding"){
    return(
      <SafeAreaView style={styles.safeAreaView}>
        <AddBuildingPage data={buildings} setCurrentPage={(newPage) => setCurrentPage(newPage)}/>
      </SafeAreaView>
    );
  }
  
  return null;
}

export default App;
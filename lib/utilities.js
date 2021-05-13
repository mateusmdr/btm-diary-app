function getWeekDay(date) {
    switch(date.getDay()) {
        case 0:
            return 'Domingo';
        case 1:
            return 'Segunda-feira';
        case 2:
            return 'Terça-feira';
        case 3:
            return 'Quarta-feira';
        case 4:
            return 'Quinta-feira';
        case 5:
            return 'Sexta-feira';
        case 6:
            return 'Sábado';
    }
}


function getBuildingIndexById(buildings,key) {

    const index = buildings.findIndex(element => element.key === key);

    return index;
}

export {getWeekDay, getBuildingIndexById};
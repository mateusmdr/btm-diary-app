import { concat } from "react-native-reanimated";

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

function getFullDate(date){

    const day = ((date.getDate() < 10) ? '0' + date.getDate() : date.getDate());

    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    
    const fullYear = date.getFullYear();

    return day + '/' + month + '/' + fullYear;
}
export {getFullDate,getWeekDay};
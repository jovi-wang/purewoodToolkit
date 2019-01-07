import moment from 'moment-timezone';
import { coefficientList, coefficientDisplayList, lengthTypeList, TIME_ZONE, TIME_FORMAT, LANGUAGE } from './constant';

export const getTotalValue = (pcsList, lengthType) => {
    const reducer = (accumulator, currentValue, index) => ({
        pieces: accumulator.pieces + currentValue,
        m3: accumulator.m3 + currentValue * coefficientList[lengthType][index]
    });
    return pcsList.reduce(reducer, {pieces:0, m3:0});
};

export const getCurrentTime = (timeZone = TIME_ZONE, timeFormat = TIME_FORMAT) => {
    const temp = moment().tz(timeZone).format(timeFormat).split('-');
    return {
        date: temp[0],
        time: temp[1]
    }
};

export const getStartEndTime = (startTime, endTime) => {
    return `${startTime.time || '00:00:00'}/${endTime.time || '00:00:00'}`;
};

export const generateHTML = (props)=>{
    
    const {pcsList, lengthType, pieces,  
        name, tare,  yard, m3,
        openTime, startTime } = props;
    let temp = ''
    for(let i=0; i<pcsList.length; i+=1) {
        temp = `${temp}
        <tr>
            <th bgcolor='#9df441'>${i+12}</th>
            <td>${pcsList[i]}</td>
            <td>${coefficientDisplayList[lengthType][i]}</td>
        </tr>`
    };
        
    return `<html><head>
    <style>
    table {
    font-family: "Times New Roman", Times, serif;
    border-collapse: collapse;
    width: 100%;
    }
    td, th {
    border: 1px solid black;
    text-align: center;
    padding: 8px;
    }
    td.bold {
    font-weight: bold
    }
    </style>
    </head>
    <body>
    <table>
    <tr>
      <th >${LANGUAGE.CONTAINER_NAME}</th>
      <td colspan="2">${name}</td>
    </tr>
    <tr>
      <th >${LANGUAGE.LENGTH}</th>
      <td colspan="2">${lengthTypeList[lengthType]}</td>
    </tr>
    <tr>
      <th >${LANGUAGE.YARD}</th>
      <td colspan="2">${yard}</td>
    </tr>
    <tr>
      <th>${LANGUAGE.TARE}</th>
      <td colspan="2">${tare}</td>
    </tr>
    <tr>
      <th>${LANGUAGE.DATE}</th>
      <td colspan="2">${openTime.date}</td>
    </tr>
    <tr>
      <th>${LANGUAGE.START_END_TIME}</th>
      <td colspan="2">${getStartEndTime(startTime, getCurrentTime())}</td>
    </tr>
    <tr bgcolor="#e2d451">
      <th rowspan="2">${LANGUAGE.TOTAL}</th>
      <td>${LANGUAGE.PIECES}</td>
      <td>${pieces}</td>
    </tr>
    <tr bgcolor="#e2d451">
      <td>${LANGUAGE.M3}</td>
      <td>${m3}</td>
    </tr>
    <tr bgcolor='#9df441'>
      <th>${LANGUAGE.DIAMETER}</th>
      <td class="bold">${LANGUAGE.PCS}</td>
      <td class="bold">${LANGUAGE.COEFFICIENT}</td>
    </tr>
    ${temp}
    </table>
    </body>
    </html>`;
};
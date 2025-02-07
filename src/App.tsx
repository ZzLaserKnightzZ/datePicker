import { useState } from 'react'
import DatePickerComponent, { monthTH } from './DatePicker/DatePickerComponent';

import { createGlobalStyle } from "styled-components"

const Global = createGlobalStyle`
*{
  margin: 0;
  padding:0 ;
  box-sizing: border-box;
}
`;

function App() {
  const [isShow, setIshow] = useState(false);

  const clickToggleShow = () => setIshow(prev => !prev);
  return (
    <>
      {/**<Global /> */}
      <button onClick={clickToggleShow}>select Date</button>
      <DatePickerComponent
        //ประเภทวันที่
        yearType="EN"
        //วันที่สามารถเลือกได้และแสดง
        canselectDate={
          {
            from: { day: 20, month: 2, year: 2020 },
            to: { day: 1, month: 1, year: 2030 }
          }}
        defaultSelectedDate={{ timeStamps: [new Date("February 17, 2025 03:24:00").getTime(), new Date(2025, 1, 1, 0, 0, 0).getTime()] }} //วันที่เลือกไว้แล้ว
        cantSelectDate={{ timeStamps: [new Date(2025, 1, 10, 0, 0, 0).getTime(), new Date(2025, 1, 11, 0, 0, 0).getTime()] }} //วันที่ล๊อกไม่ให้เลือก
        title="เลือกวันที่" //แสดงส่วนหัว
        iShow={isShow} //แสดงปอปอัพ
        dateConverterCB={(day, month, year) => `${day}-${monthTH[month - 1]}-${year}`} //แปลงรูปแบบตอนกดokออกมา
        clickClose={() => setIshow(false)} //ปิดปอปอัพ
        clickSelected={(dates, strDate) => { console.log(dates, strDate); clickToggleShow(); }} //กดokแล้วปิดปอปอัพไป
      />
    </>
  )
}

export default App

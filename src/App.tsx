import { useState } from 'react'
import DatePickerComponent from './DatePicker/DatePickerComponent';

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
      <Global />
      <button onClick={clickToggleShow}>select Date</button>
      <DatePickerComponent
        yearType="TH"
        canselectDate={
          {
            from: { day: 20, month: 2, year: 2560 },
            to: { day: 1, month: 1, year: 2570 }
          }}
        defaultSelectedDate={{ timeStamps: [new Date().getTime(),new Date(2025,1,1,0,0,0).getTime()] }}
        cantSelectDate={{timeStamps:[new Date(2025,1,10,0,0,0).getTime(),new Date(2025,1,11,0,0,0).getTime()]}}
        title="เลือกวันที่"
        iShow={isShow}
        clickClose={() => setIshow(false)}
        clickSelected={(dates, strDate) => { console.log(dates, strDate); clickToggleShow(); }} />
    </>
  )
}

export default App

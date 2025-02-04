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
     yearType="EN"
      canselectDate={
        {from:{day:20,month:2,year:2020},
        to:{day:1,month:1,year:2030}}} 
        defaultDate={{timeStamps:[new Date().getTime()]}}
        title="เลือกวันที่" 
        iShow={isShow} 
        clickClose={() => setIshow(false)} 
        clickSelected={(dates,strDate) => { console.log(dates,strDate); clickToggleShow(); }}  />
    </>
  )
}

export default App

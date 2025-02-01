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
      <DatePickerComponent title="เลือกวันที่" iShow={isShow} clickClose={() => setIshow(false)} clickSelected={(dates) => { console.log(dates); clickToggleShow(); }} reserveDate={60} />
    </>
  )
}

export default App

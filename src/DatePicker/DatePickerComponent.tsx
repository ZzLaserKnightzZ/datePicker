import { FaCheck, FaGreaterThan, FaLessThan, FaRegTimesCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import * as  Picker from "./DatePickerComponent.styled";
import { useEffect, useState } from "react";

type Props = {
    iShow: boolean;
    clickSelected: (dates: TRenderDate[]) => void;
    clickClose: () => void;
    reserveDate: number;
    title: string;
}

export type TRenderDate = {
    isSelected: boolean;
    canSelect: boolean;
    date: Date;
    isShowing?: boolean;
}

export type TSelectMonthAndYear = {
    months: {
        isSelected: boolean;
        nameTh: string;
        monthNumber: number;
    }[];
    year: number;
}

export const monthTH = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
export const dayTH = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"];
export const AddDays = (date: Date, days: number) => {
    const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    return newDate;
}

export default function DatePickerComponent({ title, iShow, clickSelected, clickClose, reserveDate }: Props) {
    const [today, _] = useState(new Date()); //วันที่วันนี้
    const [monthAndYear, setMonthAndYear] =
        useState<TSelectMonthAndYear>({ year: today.getFullYear(), months: monthTH.map((x, i) => ({ monthNumber: i, nameTh: x, isSelected: today.getUTCMonth() === i })) });
    const [renderDay, setRenderDay] = useState<TRenderDate[]>([]); //แสดงรายการให้เลือก
    const [selectedDate, setSelectedDate] = useState<TRenderDate[]>([]); //วันที่เลือกแล้ว

    function clickPrevMonth(): void {
        setMonthAndYear(prev => {
            const state = { ...prev };
            let current = state.months.find(x => x.isSelected)?.monthNumber;
            if (current != undefined) {
                current -= 1;
                current = current >= 0 ? current : 11;
                state.months = state?.months.map((x) => ({ ...x, isSelected: x.monthNumber == current ? true : false }));
                state.year = current == 11 ? state.year - 1 : state.year; //ถ้าเลื่อนขึ้นแล้ว มีค่าเป็น12 แสดงว่าลงมา1ปี
            }
            return state;
        });
    }

    function clickNextMonth(): void {
        setMonthAndYear(prev => {
            const state = { ...prev };
            let current = state.months.find(x => x.isSelected)?.monthNumber; //if > 12 nextyear:next month
            if (current != undefined) {
                current += 1;
                current = current <= 11 ? current : 0;
                state.months = state.months.map((x) => ({ ...x, isSelected: x.monthNumber == current ? true : false }));
                state.year = current == 0 ? state.year + 1 : state.year; //ถ้าเลื่อนขึ้นแล้ว มีค่าเป็น1 แสดงว่าขึ้นปีไหม่
            }
            return state;
        });
    }
    const clickCancle = (date: TRenderDate) => () => {
        setSelectedDate(prev => prev.filter(x => x.date.getTime() != date.date.getTime()));
        setRenderDay(prev => prev.map(x => x.date.getTime() == date.date.getTime() ? ({ ...x, isSelected: !x.isSelected }) : ({ ...x }))); //show selected
    }
    const clickSelect = (date: TRenderDate) => () => {
        if (date.canSelect) {
            if (selectedDate.find(x => x.date.getTime() == date.date.getTime())) {
                setSelectedDate(prev => prev.filter(x => x.date.getTime() != date.date.getTime())); //render Date
                setRenderDay(prev => prev.map(x => x.date.getTime() == date.date.getTime() ? ({ ...x, isSelected: !x.isSelected }) : ({ ...x }))); //show selected
            } else {
                setSelectedDate(prev => [...prev, date]); //add date
                setRenderDay(prev => prev.map(x => x.date.getTime() == date.date.getTime() ? ({ ...x, isSelected: !x.isSelected }) : ({ ...x }))); //show selected
            }
        }
    }

    const initDate = () => {
        //set day
        let dates: TRenderDate[] = [];
        //add month here
        const startDate = new Date(today.getUTCFullYear(), today.getMonth(), 1, today.getHours(), today.getMinutes(), today.getSeconds()); //วันที่1ของทุกเดือน
        const startDateInWeek = -startDate.getDay(); //start day of week ว่าวันที่เริ่มเป็นวันที่วันไหนในสัปดาห์ อ-ส = 0-6
        for (let day = startDateInWeek; day <= 31; day++) {
            const date = AddDays(startDate, day);
            if (date.getMonth() === today.getMonth()) { //ถ้าเดือนเดียวกัน
                const d: TRenderDate = {
                    isSelected: false,
                    canSelect: today.getDate() < date.getDate(), //ถ้าน้อยกว่าวันที่ปัจจุบันเลือกไม่ได้
                    date: date,
                    isShowing: true
                };
                dates = [...dates, d];
            } else { //ถ้าเดือนอื่นๆ
                const d: TRenderDate = {
                    isSelected: false,
                    canSelect: false,
                    date: date,
                    isShowing: true
                };
                dates = [...dates, d];
            }
        }
        //add filter
        setRenderDay(dates);
    }
    const changeMonth = () => {
        //set day
        let dates: TRenderDate[] = [];
        //add month here
        const selectedMonth = monthAndYear?.months.find(x => x.isSelected);
        if (!selectedMonth) return;

        const startDate = new Date(monthAndYear.year, selectedMonth.monthNumber, 1, today.getHours(), today.getMinutes(), today.getSeconds()); //วันที่1ของทุกเดือน
        const startDateInWeek = - startDate.getDay(); //start day of week ว่าวันที่เริ่มเป็นวันที่วันไหนในสัปดาห์ อ-ส = 0-6

        for (let day = startDateInWeek; day <= 31; day++) { //วนเพิ่มวัน
            const date = AddDays(startDate, day);
            if (date.getMonth() === startDate.getMonth()) { //ถ้าเดือนเดียวกันกับที่โชว
                let canSelect = (date.getTime() > today.getTime() && startDate.getTime() < AddDays(today, reserveDate).getTime()); //เลือกได้ไม่เกิน 60วันจากวันที่ปัจจุบัน
                const d: TRenderDate = {
                    isSelected: false,
                    canSelect: canSelect, //ถ้าน้อยกว่าวันที่ปัจจุบันเลือกไม่ได้
                    date: date,
                    isShowing: true
                };
                dates = [...dates, d];
            } else { //ถ้าเดือนอื่นๆที่เกินมาในเเต่ละเดือน
                const d: TRenderDate = {
                    isSelected: false,
                    canSelect: false,
                    date: date,
                    isShowing: true
                };
                dates = [...dates, d];
            }
        }

        //add filter date

        setRenderDay(_ => {
            //assign new  value
            for (const selectDate of selectedDate) { //เชควันที่เลือกแล้ว
                dates = [...dates.map(x => {
                    if (x.date.getDate() == selectDate.date.getDate() && x.date.getMonth() == selectDate.date.getMonth() && x.date.getUTCFullYear() == selectDate.date.getUTCFullYear()) {
                        return { ...x, isSelected: true };
                    } else {
                        return x;
                    }
                })];
            }
            return dates;
        });
    }
    useEffect(initDate, []);
    useEffect(changeMonth, [monthAndYear]);


    function clickOk(): void {
        clickSelected && clickSelected(selectedDate);
    }

    return (
        <Picker.Container $isShow={iShow}>
            <Picker.ContainerWrapper>

                <Picker.Header>
                    <Picker.CloseBtn onClick={clickClose}>
                        <FaTimes />
                    </Picker.CloseBtn>
                    <Picker.Banner>
                        {title}
                    </Picker.Banner>
                    <Picker.OkBtn onClick={clickOk}>
                        <FaCheck />
                    </Picker.OkBtn>
                </Picker.Header>

                <Picker.CurrentDate>
                    วันนี้วันที่ {dayTH[today.getDay()]} ที่ {today.getUTCDate()}/{today.getUTCMonth() + 1}/{today.getUTCFullYear()}
                </Picker.CurrentDate>

                <Picker.MonthSelect>
                    <Picker.ChangeMonthBtn onClick={clickPrevMonth}>
                        <FaLessThan />
                    </Picker.ChangeMonthBtn>
                    <Picker.MonthName>
                        {monthAndYear.months.find(x => x.isSelected)?.nameTh} {monthAndYear.year}
                    </Picker.MonthName>
                    <Picker.ChangeMonthBtn onClick={clickNextMonth}>
                        <FaGreaterThan />
                    </Picker.ChangeMonthBtn>
                </Picker.MonthSelect>

                <Picker.DateContainer>

                    <Picker.DateDayNameContainer>
                        <Picker.DayName>อาทิตย์</Picker.DayName>
                        <Picker.DayName>จันทร์</Picker.DayName>
                        <Picker.DayName>อังคาร</Picker.DayName>
                        <Picker.DayName>พุทธ</Picker.DayName>
                        <Picker.DayName>พฤหัส</Picker.DayName>
                        <Picker.DayName>ศุกร์</Picker.DayName>
                        <Picker.DayName>เสาร์</Picker.DayName>
                    </Picker.DateDayNameContainer>

                    <Picker.DateDayNameContainer>
                        {
                            renderDay.map((x, i) =>
                                <Picker.SelectDay
                                    key={i}
                                    onClick={clickSelect(x)}
                                    $canSelect={x.canSelect}
                                    $isSelected={x.isSelected}>
                                    {x.date.getDate()}
                                </Picker.SelectDay>)
                        }
                    </Picker.DateDayNameContainer>

                    <Picker.SelectedBanner>วันที่เลือกแล้ว {selectedDate.length} วัน</Picker.SelectedBanner>

                    <Picker.SelectedDayContianer>
                        {
                            selectedDate.map((x, i) =>
                                <Picker.SelectedDayItem key={i}>
                                    <Picker.SelectedDayNumber>{i+1}</Picker.SelectedDayNumber>
                                    <Picker.SelectedDayText>
                                        {dayTH[x.date.getDay()]}  {x.date.getDate()}/{x.date.getMonth()+1} {x.date.getUTCFullYear()}
                                    </Picker.SelectedDayText>
                                    <Picker.SelectedDayBtnDelete onClick={clickCancle(x)}>
                                        <FaRegTimesCircle />
                                    </Picker.SelectedDayBtnDelete>
                                </Picker.SelectedDayItem>)
                        }
                    </Picker.SelectedDayContianer>

                </Picker.DateContainer>

            </Picker.ContainerWrapper>
        </Picker.Container>
    );
}
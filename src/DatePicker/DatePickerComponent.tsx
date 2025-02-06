import { FaAngleDown, FaCheck, FaGreaterThan, FaLessThan, FaRegTimesCircle, FaTimes } from "react-icons/fa";
import * as  Picker from "./DatePickerComponent.styled";
import { useEffect, useState } from "react";

type Props = {
    iShow: boolean;
    clickSelected: (dates: TRenderDate[], strDatesDDMMYYYY: string[]) => void;
    clickClose: () => void;
    title: string;
    canselectDate: TCanSelectProp;
    defaultSelectedDate?: TDefaultDate;
    cantSelectDate?: TCantSelectDate;
    yearType: "EN" | "TH"
}

export type TRenderDate = {
    isSelected: boolean;
    canSelect: boolean;
    date: Date;
    isShowing?: boolean;
}

export type TDefaultDate = {
    timeStamps: number[];
}

export type TCantSelectDate = {} & TDefaultDate;

export type TCanSelectProp = {
    from: { day: number; month: number; year: number; }
    to: { day: number; month: number; year: number; }
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
export const monthEN = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
export const dateTH = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
export const dateEN = ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"]; //date Not day

export const AddDays = (date: Date, days: number) => {
    const newDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    return newDate;
}

const toDay = new Date();

export default function DatePickerComponent({ title, canselectDate, defaultSelectedDate, cantSelectDate, iShow, yearType, clickSelected, clickClose }: Props) {
    const [isOpenSelectYear, setIsOpenSelectYear] = useState(false);
    const [today, _] = useState(toDay); //วันที่วันนี้
    const [monthAndYear, setMonthAndYear] =
        useState<TSelectMonthAndYear>({ year: today.getFullYear(), months: monthTH.map((x, i) => ({ monthNumber: i, nameTh: x, isSelected: today.getUTCMonth() === i })) });
    const [renderDay, setRenderDay] = useState<TRenderDate[]>([]); //แสดงรายการให้เลือก
    const [selectedDate, setSelectedDate] = useState<TRenderDate[]>([]); //วันที่เลือกแล้ว

    const clickSelectYear = (year: number) => () => {
        setMonthAndYear(prev => {
            const state = { ...prev };
            state.year = year;
            return state;
        });
        setIsOpenSelectYear(false);
    }
    function clickPrevMonth(): void {
        setMonthAndYear(prev => {
            const state = { ...prev };
            let current = state.months.find(x => x.isSelected)?.monthNumber;
            if (current != undefined) {
                current -= 1;
                current = current >= 0 ? current : 11;
                state.months = state?.months.map((x) => ({ ...x, isSelected: x.monthNumber == current ? true : false }));
                state.year = current == 11 ? state.year - 1 : state.year;
                if (yearType == "TH") {
                    state.year = state.year <= canselectDate.from.year - 543 ? canselectDate.from.year - 543 : state.year;
                } else {
                    state.year = state.year <= canselectDate.from.year ? canselectDate.from.year : state.year;
                }

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
                if (yearType == "TH") {
                    state.year = state.year >= canselectDate.to.year - 543 ? canselectDate.to.year - 543 : state.year;
                } else {
                    state.year = state.year >= canselectDate.to.year ? canselectDate.to.year : state.year;
                }

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

        const fromDate = new Date(yearType == "TH" ? canselectDate.from.year - 543 : canselectDate.from.year, canselectDate.from.month, canselectDate.from.day, 0, 0, 0);
        const toDate = new Date(yearType == "TH" ? canselectDate.to.year - 543 : canselectDate.to.year, canselectDate.to.month, canselectDate.to.day, 0, 0, 0);

        const defaulDates: Date[] = [];
        if (defaultSelectedDate) {
            for (const timeStamp of defaultSelectedDate?.timeStamps) {
                defaulDates.push(new Date(timeStamp));
            }
        }
        const cantSelectDates: Date[] = [];
        if (cantSelectDate) {
            for (const cantSelect of cantSelectDate?.timeStamps) {
                cantSelectDates.push(new Date(cantSelect));
            }
        }

        for (let day = startDateInWeek; day <= 31; day++) {
            const date = AddDays(startDate, day);
            let canselect = false;
            let selected = false;

            if ((date.getTime() >= fromDate.getTime()) && (date.getTime() <= toDate.getTime())) {
                canselect = true;
            }

            for (const cantSelect of cantSelectDates)
                if ((date.getDate() == cantSelect.getDate()) && (date.getMonth() == cantSelect.getMonth() && date.getFullYear() == cantSelect.getFullYear())) {
                    canselect = false;
                    break;
                }
            //วันที่เลือกแล้ว
            for (const selectedDate of defaulDates) {
                if (selectedDate.getDate() == date.getDate() &&
                    selectedDate.getMonth() == date.getMonth() &&
                    selectedDate.getFullYear() == date.getFullYear()
                ) {
                    selected = true;
                    break;
                }
            }
            const d: TRenderDate = {
                isSelected: selected,
                canSelect: canselect,
                date: date,
                isShowing: true
            };
            dates = [...dates, d];

        }
        //add filter
        setRenderDay(dates);
        setSelectedDate(dates.filter(x => x.isSelected));
    }
    const changeMonth = () => {
        //set day
        let dates: TRenderDate[] = [];
        //add month here
        const selectedMonth = monthAndYear?.months.find(x => x.isSelected);
        if (!selectedMonth) return;

        const startDate = new Date(monthAndYear.year, selectedMonth.monthNumber, 1, today.getHours(), today.getMinutes(), today.getSeconds()); //วันที่1ของทุกเดือน
        const startDateInWeek = - startDate.getDay(); //start day of week ว่าวันที่เริ่มเป็นวันที่วันไหนในสัปดาห์ อ-ส = 0-6

        const fromDate = new Date(yearType == "TH" ? canselectDate.from.year - 543 : canselectDate.from.year, canselectDate.from.month, canselectDate.from.day, 0, 0, 0);
        const toDate = new Date(yearType == "TH" ? canselectDate.to.year - 543 : canselectDate.to.year, canselectDate.to.month, canselectDate.to.day, 0, 0, 0);

        const cantSelectDates: Date[] = [];
        if (cantSelectDate) {
            for (const cantSelect of cantSelectDate?.timeStamps) {
                cantSelectDates.push(new Date(cantSelect));
            }
        }

        for (let day = startDateInWeek; day <= 31; day++) { //วนเพิ่มวัน
            const date = AddDays(startDate, day);
            let canselect = false;
            if ((date.getTime() >= fromDate.getTime()) && (date.getTime() <= toDate.getTime())) {
                canselect = true;
            }

            for (const cantSelect of cantSelectDates)
                if ((date.getDate() == cantSelect.getDate()) && (date.getMonth() == cantSelect.getMonth() && date.getFullYear() == cantSelect.getFullYear())) {
                    canselect = false;
                    break;
                }

            const d: TRenderDate = {
                isSelected: false,
                canSelect: canselect,
                date: date,
                isShowing: true
            };
            dates = [...dates, d];

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


    useEffect(initDate, [iShow]);
    useEffect(changeMonth, [monthAndYear]);


    function clickOk(): void {
        const strDate = selectedDate.map(x => `${x.date.getDate()}/${x.date.getMonth() + 1}/${yearType == "TH" ? x.date.getFullYear() + 543 : x.date.getFullYear()}`);
        clickSelected && clickSelected(selectedDate, strDate);
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
                    {yearType == "TH" ? dateTH[today.getDay()] : dateEN[today.getDay()]} ที่ {today.getUTCDate()}/{today.getUTCMonth() + 1}/{yearType == "TH" ? today.getUTCFullYear() + 543 : today.getUTCFullYear()}
                </Picker.CurrentDate>

                {/**selected year */}
                <Picker.CurrentYear>
                    &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;  {yearType == "TH" ? monthAndYear.year + 543 : monthAndYear.year} &nbsp; &nbsp;
                    <Picker.SelectYearBtn $isOpen={isOpenSelectYear} onClick={() => setIsOpenSelectYear(prev => !prev)}><FaAngleDown /></Picker.SelectYearBtn>
                </Picker.CurrentYear>
                {
                    isOpenSelectYear ?
                        <Picker.SelectYearContainer>
                            <Picker.SelectYearWrapper>
                                {
                                    Array.apply(null, Array(Math.floor(((yearType == "TH" ? canselectDate.to.year + 543 : canselectDate.to.year) - (yearType == "TH" ? canselectDate.from.year + 543 : canselectDate.from.year))) + 1))
                                        .map((_, i) => canselectDate.from.year + i)
                                        .map(year =>
                                            <Picker.SelectYear key={year} $isSelected={year == (yearType == "TH" ? monthAndYear.year + 543 : monthAndYear.year)} onClick={clickSelectYear(yearType == "TH" ? year - 543 : year)}>
                                                {year}
                                            </Picker.SelectYear>)
                                }
                            </Picker.SelectYearWrapper>
                        </Picker.SelectYearContainer>
                        :
                        <>
                            <Picker.MonthSelect>
                                <Picker.ChangeMonthBtn onClick={clickPrevMonth}>
                                    <FaLessThan />
                                </Picker.ChangeMonthBtn>
                                <Picker.MonthName>
                                    {monthAndYear.months.find(x => x.isSelected)?.nameTh} {yearType == "TH" ? monthAndYear.year + 543 : monthAndYear.year}
                                </Picker.MonthName>
                                <Picker.ChangeMonthBtn onClick={clickNextMonth}>
                                    <FaGreaterThan />
                                </Picker.ChangeMonthBtn>
                            </Picker.MonthSelect>

                            <Picker.DateContainer>

                                <Picker.DateDayNameContainer>
                                    {
                                        yearType == "TH" ?
                                            dateTH.map((x, i) => <Picker.DayName key={i}>{x}</Picker.DayName>)
                                            :
                                            dateEN.map((x, i) => <Picker.DayName key={i}>{x}</Picker.DayName>)
                                    }
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
                                                <Picker.SelectedDayNumber>{i + 1}</Picker.SelectedDayNumber>
                                                <Picker.SelectedDayText>
                                                    {yearType == "TH" ? dateTH[x.date.getDay()] : dateEN[x.date.getDay()]}  {x.date.getDate()}/{x.date.getMonth() + 1} {yearType == "TH" ? x.date.getUTCFullYear() + 543 : x.date.getUTCFullYear()}
                                                </Picker.SelectedDayText>
                                                <Picker.SelectedDayBtnDelete onClick={clickCancle(x)}>
                                                    <FaRegTimesCircle />
                                                </Picker.SelectedDayBtnDelete>
                                            </Picker.SelectedDayItem>)
                                    }
                                </Picker.SelectedDayContianer>

                            </Picker.DateContainer>
                        </>
                }


            </Picker.ContainerWrapper>
        </Picker.Container>
    );
}
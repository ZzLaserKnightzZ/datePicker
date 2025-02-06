import styled, { css } from "styled-components";

export const Container = styled.div<{ $isShow: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  display: flex;
  justify-content: center;
  transition: all 1s;

  ${({ $isShow }) =>
    $isShow
      ? css`
          transform: translate(0, 0);
        `
      : css`
          transform: translate(-100%, -100%);
        `}
`;

export const ContainerWrapper = styled.div`
  width: clamp(200px, 90%, 800px);
  margin: 1rem;
  padding: 5px;
  border-radius: 10px;
  overflow-y: auto;
  max-height: 650px;
  display: grid;
  grid-template-rows: 2rem 2rem 2rem 2rem auto;
  gap: 5px;

  background: #424242;
  border: 1px solid rgb(238, 130, 255);
  box-shadow: 0 0 5px rgb(238, 130, 255);
`;

export const Header = styled.div`
  border-radius: 5px;
  position: sticky;
  top: -5px;
  display: grid;
  grid-template-columns: 2rem 1fr 2rem;

  color: white;
  background: linear-gradient(
    to right,
    rgba(255, 0, 255, 1),
    rgba(58, 135, 255, 1)
  );
`;

export const CloseBtn = styled.button`
  color: white;
  border: 2px solid rgb(255, 0, 0);
  box-shadow: inset 0 0 5px rgb(255, 0, 0);
  border-radius: 5px;
  background: transparent;
  font-size: 1.5rem;
  display: grid;
  place-items: center;
`;

export const Banner = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  display: grid;
  place-items: center;
`;

export const OkBtn = styled(CloseBtn)`
  color: white;
  border: 2px solid lime;
  box-shadow: inset 0 0 5px lime;
`;

export const CurrentDate = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  display: grid;
  place-items: center;
`;

export const SelectYearBtn = styled.button<{ $isOpen: boolean }>`
  background: transparent;
  color: white;
  box-shadow: inset 0 0 10px aqua;
  border-radius: 50%;
  border: none;
  font-size: 1.2rem;
  display: grid;
  place-items: center;
  height: calc(2rem - 2px);
  width: calc(2rem - 2px);

  transition: all 1s;
  ${({ $isOpen }) =>
    $isOpen
      ? css`
          transform: rotate(180deg);
        `
      : css`
          transform: rotate(0deg);
        `}
`;

export const SelectYearContainer = styled.div`
  border: 1px solid white;
  padding: 5px;
  border-radius: 5px;
  grid-row-start: 4;
  grid-row-end: -1;
  padding: 5px;
`;

export const SelectYearWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(3.5rem, 1fr));
  gap: 5px;
`;

export const SelectYear = styled.div<{ $isSelected: boolean }>`
  height: clamp(2.5rem,5vh,5rem);
  display: grid;
  border-radius: 5px;
  place-items: center;
  font-size: 1.3rem;
  color: white;
  border: 1px solid white;

  ${({ $isSelected }) =>
    $isSelected
      ? css`
          border: 5px solid aqua;
        `
      : css``}
  &:hover {
    box-shadow: 0 0 10px aqua;
    scale: 1.01;
  }
`;

export const CurrentYear = styled(CurrentDate)`
  display: inline-flex;
  justify-content: center;
`;

export const MonthSelect = styled.div`
  border-top: 1px solid white;
  display: grid;
  grid-template-columns: 2rem 1fr 2rem;
`;

export const ChangeMonthBtn = styled.button`
  color: white;
  border: 2px solid aqua;
  box-shadow: inset 0 0 5px aqua;
  background: transparent;

  display: grid;
  place-items: center;
  border-radius: 50%;
`;

export const MonthName = styled.div`
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.2rem;
`;

export const DateContainer = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;
`;

export const DateDayNameContainer = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  border-radius: 5px;
`;

export const DayName = styled.div`
  background: white;
  color: black;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  place-items: center;
  min-width: 0;
  font-weight: 800;
  font-size: clamp(0.6rem, 2vw, 1.2rem);
`;

export const SelectDay = styled.div<{
  $isSelected: boolean;
  $canSelect: boolean;
}>`
  user-select: none;
  background: white;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  place-items: center;
  &:hover {
    box-shadow: inset 0 0 10px aqua;
  }
  ${({ $canSelect }) =>
    $canSelect
      ? css``
      : css`
          background: gray;
          pointer-events: none;
        `}

  ${({ $isSelected }) =>
    $isSelected
      ? css`
          border: 5px solid aqua;
        `
      : css`
          border: 5px solid white;
        `}
`;

export const SelectedBanner = styled.div`
  font-size: 1.2rem;
  height: 2rem;
  color: white;
  display: grid;
  place-items: center;
`;

export const SelectedDayContianer = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 5px;
`;

export const SelectedDayItem = styled.div`
  background: orange;
  border-radius: 5px;
  height: 1.5rem;
  display: grid;
  grid-template-columns: 1.5rem 1fr 1.5rem;
`;

export const SelectedDayNumber = styled.div`
  color: white;
  border-radius: 5px;
  display: grid;
  place-items: center;
`;

export const SelectedDayText = styled.div`
  color: white;
  border-radius: 5px;
  display: grid;
  place-items: center;
`;

export const SelectedDayBtnDelete = styled.button`
  border-radius: 5px;
  font-size: 1.2rem;
  display: grid;
  place-items: center;
  color: white;
  border: 2px solid rgb(255, 0, 0);
  box-shadow: inset 0 0 5px rgb(255, 0, 0);
`;

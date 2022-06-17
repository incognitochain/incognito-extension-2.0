import React from "react";
import { Styled } from "./DropDown.styled";

interface DropDownProps {
  dataList: any[];
  defaultItem: string;
  itemOnClick: (item: any) => void;
}

export const DropDown = (props: DropDownProps) => {
  const { dataList = [], itemOnClick = () => {}, defaultItem } = props;
  if (dataList.length < 1) return null;
  return (
    <Styled>
      <button className="main-content">
        <p className="fs-regular fw-regular">{defaultItem}</p>
        <p className="icon-drop-down"></p>
      </button>
      <div className="dropdown-content">
        {dataList.map((item) => {
          return (
            <button key={item} className="hover-with-cursor" onClick={() => itemOnClick(item)}>
              <p className=" fs-regular fw-medium"> {item}</p>
            </button>
          );
        })}
      </div>
    </Styled>
  );
};

import React from "react";

export interface IHistoryItem {
  id?: string;
  title?: string;
  desc?: string;
  copyData?: string;
  link?: string;
  descClassName?: string;
  titleClassName?: string;
  descColor?: string;
  customItem?: React.ReactNode | any;
  disabled?: boolean;
  message?: string;
  sub?: React.ReactNode | any;
  retryShield?: boolean;
  removeShield?: boolean;
  hookClassName?: string;
}

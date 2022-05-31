import React, { HTMLAttributes, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import SearchBox from "./Header.searchBox";

export interface TInner {
  handleClick: () => void;
  renderHeaderTitle: () => React.ReactNode;
}

export interface IProps {
  title?: string;
  onGoBack?: () => void;
  rightHeader?: any;
  selectAccount?: boolean;
  canSearch?: boolean;
  customHeader?: React.ReactNode;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & HTMLAttributes<HTMLElement>) => {
  const { canSearch = false, onGoBack, title, customHeader } = props;
  const [state, setState] = React.useState({
    toggleSearch: false,
  });
  const { toggleSearch } = state;
  const onHandleToggleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (canSearch) {
      await setState({
        ...state,
        toggleSearch: true,
      });
    }
  };
  const history = useHistory();
  const handleClick = () => {
    if (typeof onGoBack === "function") {
      return onGoBack();
    }
    history.goBack();
    return null;
  };
  const renderHeaderTitle = () => {
    if (toggleSearch) {
      return <SearchBox title={title} />;
    }
    return (
      <div className="header-container flex">
        {!!title && (
          <Link
            to="#"
            onClick={onHandleToggleSearch}
            className={`header-title fw-medium fs-large ellipsis main-text ${canSearch ? "sub-text" : ""}`}
          >
            {title}
          </Link>
        )}
        {customHeader && customHeader}
      </div>
    );
  };
  return (
    <WrappedComponent
      {...{
        ...props,
        toggleSearch,
        renderHeaderTitle,
        handleClick,
        title,
      }}
    />
  );
};

export default enhance;

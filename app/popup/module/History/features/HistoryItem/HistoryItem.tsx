import React from "react";
import { CopyIcon, OpenLinkIcon } from "@components/Icons";
import { IHistoryItem } from "./HistoryItem.interface";
import { Styled } from "./HistoryItem.styled";

const HistoryItem = React.memo((props: IHistoryItem) => {
  const {
    customItem,
    title,
    desc,
    copyData = "",
    link = "",
    descClassName = "",
    titleClassName = "",
    descColor = "",
    disabled = false,
    message = "",
    sub,
    hookClassName = "",
  } = props;
  const toggleStatusMessage = !!message;
  const [toggle, setToggle] = React.useState(false);

  const handleOpenLink = () => window.open(link);
  if (disabled) {
    return null;
  }
  if (customItem) {
    return customItem;
  }
  if (!desc) {
    return null;
  }
  return (
    <Styled>
      <div className="history-tx-item">
        <p className={`sub-text title ${titleClassName}`}>{title}</p>
        <div className={`hook ${hookClassName}`}>
          <span className={`ellipsis desc ${descClassName}`} style={{ color: descColor }}>
            {desc}
          </span>
          {!!sub && sub}
          {message && (
            <div
              className={`${toggleStatusMessage ? "toggle-message" : ""} arrow-icon center-abs-ver`}
              onClick={() => setToggle(!toggle)}
            >
              {/*{toggle ? <ArrowDownIcon /> : <ArrowUpIcon />}*/}
            </div>
          )}
          {!!copyData && <CopyIcon text={copyData} />}
          {!!link && <OpenLinkIcon onClick={handleOpenLink} />}
        </div>
      </div>
      {!!message && toggle && <p className="fs-small sub-text message" dangerouslySetInnerHTML={{ __html: message }} />}
    </Styled>
  );
});
export default React.memo(HistoryItem);

import React, { ImgHTMLAttributes } from "react";

interface IProps extends ImgHTMLAttributes<any> {
  iconUrl: string;
}

const Image = React.memo((props: IProps) => {
  const { iconUrl } = props;
  const [imgSrc, setImgSrc] = React.useState<string | undefined>("");
  const onError = () => setImgSrc("./icons/inc_logo.png");

  console.log(imgSrc);
  return <img className="logo noselect" src={imgSrc ? iconUrl : imgSrc} alt="logo-icon" onError={onError} />;
});

export { Image };

import React from "react";
import "./SplashScreen.css";
import Spinner from "./Spinner";

export const SplashScreen: React.FC = () => {
  return (
    <div style={{ width: 375, height: 600, backgroundColor: "black" }}>
      <div className="pos-center">
        <Spinner />
      </div>
    </div>
  );
};

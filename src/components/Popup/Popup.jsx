import React from "react";
import "./Popup.css";

const Popup = ({ children }) => {
  return <div className="notify-popup">{children}</div>;
};

export default Popup;

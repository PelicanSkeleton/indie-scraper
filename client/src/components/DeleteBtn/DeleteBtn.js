import React from "react";
import "./DeleteBtn.css";

const DeleteBtn = props => (
  <button className="delete-btn btn-sm" {...props}>
    ✗
  </button>
);

export default DeleteBtn;
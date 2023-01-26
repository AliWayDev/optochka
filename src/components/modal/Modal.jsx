import React, { useEffect } from "react";
import '../modal/Modal.scss'

export const Modal = ({ title, info, close }) => {

  useEffect(() => {
    
  }, [])

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-title">
          <p>{title}</p>
        </div>
        <div className="modal-info">
          <p>{info}</p>
        </div>
        <button className="modal-btn" onClick={() => close(false)}>
          Close
        </button>
      </div>
    </div>
  );
};

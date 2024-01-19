import "./Modal.css";

import * as modalActions from "../../store/reducers/modals";
import { useDispatch } from "react-redux";

function Modal({ children }) {
  const dispatch = useDispatch();

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };
  return (
    <div id="modal">
      <div id="modal-background" />
      <div id="modal-content">
        <button className="closeBtn" onClick={handleCloseBtn}>
          X
        </button>
        <div id="body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

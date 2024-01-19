import "./Modal.css";

// import * as modalActions from "../../store/reducers/modals";
// import { useDispatch } from "react-redux";

function Modal({ children }) {
  // const dispatch = useDispatch();

  return (
    <div id="modal">
      <div id="modal-background" />
      <div id="modal-content">{children}</div>
    </div>
  );
}

export default Modal;

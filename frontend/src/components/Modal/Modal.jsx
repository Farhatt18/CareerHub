import "./Modal.css";

// function Modal({ children }) {
//   return (
//     <div id="modal">
//       <div id="modal-background" />
//       <div id="modal-content">{children}</div>
//     </div>
//   );
// }

// export default Modal;

// import "./Modal.css";
// import PostForm from "../posts/PostForm";
// function Modal({ closeModal }) {
//   return (
//     // <div id="modal">
//     <div className="modalBackground">
//       <div className="modalContent">
//         <div className="titleCloseBtn">
//           <button onClick={() => closeModal(false)}> X </button>
//         </div>
//         <div className="title">Demo</div>
//         <div className="body">
//           <PostForm />
//         </div>
//         <div className="footer">
//           <button>Post</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Modal;

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

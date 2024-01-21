// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { updatePost } from "../../store/reducers/post";
// import * as modalActions from "../../store/reducers/modals";

// import Modal from "../Modal/modal";

// const EditPost = ({ postId }) => {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const post = useSelector((state) => state.posts[postId]);
//   const [editedBody, setEditedBody] = useState(post.body);

//   useEffect(() => {
//     setEditedBody(post.body);
//     dispatch(modalActions.showModal("SHOW_MODAL", { postId }));
//   }, [dispatch, postId, post.body]);

//   const handleEditPost = (e) => {
//     e.preventDefault();
//     const updatedPost = { ...post, body: editedBody };
//     dispatch(updatePost(updatedPost));
//     dispatch(modalActions.hideModal());
//   };

//   const handleCloseBtn = () => {
//     dispatch(modalActions.hideModal());
//   };

//   return (
//     <Modal>
//       <div className="postModalWrapper">
//         <h2 className="sharedHeader">
//           <button className="btnShared">
//             <div className="icon">
//               <i className="fa-solid fa-user-circle fa-3x" />
//               <span>{sessionUser.userName}</span>
//             </div>
//           </button>
//           <button className="closeBtn" onClick={handleCloseBtn}>
//             X
//           </button>
//         </h2>
//         <div className="sharedBody">
//           <form onSubmit={handleEditPost}>
//             <textarea
//               value={editedBody}
//               onChange={(e) => setEditedBody(e.target.value)}
//               maxLength={3000}
//             />

//             <div className="footer">
//               <button type="submit" className={editedBody ? "active" : ""}>
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default EditPost;

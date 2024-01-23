import { useState } from "react";
import { createComment } from "../../store/reducers/comment";
import { useDispatch } from "react-redux";
import "./createComment.css";

const CreateComment = ({ postId, postUserId, onAddComments }) => {
  const dispatch = useDispatch();
  const [body, setBody] = useState("");
  // const [showDropDown, setShowDropDown] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // const [upatedBody, setUpdatedBody] = useState("");
  // const sessionUser = useSelector((state) => state.session.user);
  // const [show, setShow] = useState(false);

  const handleCreateComment = (e) => {
    e.preventDefault();

    onAddComments(body);
    dispatch(createComment(postId, postUserId, body));
    setBody("");
  };

  // const handleEditComment = (commentId) => {
  //   dispatch(updateComment({ id: commentId, body: upatedBody }));
  //   setIsEditing(false);
  // };

  // const handleDelete = () => {
  //   if (sessionUser && sessionUser.id === commentUserId) {
  //     dispatch(deleteComment(commentId));
  //     setShowDropDown(false);

  //   }
  // };
  return (
    <div className="commentForm">
      <i className="fa-solid fa-user-circle fa-2x" />
      <form>
        <input
          value={body}
          placeholder="Add a comment..."
          onChange={(e) => setBody(e.target.value)}
        />
        {body && <button onClick={handleCreateComment}>Post</button>}
      </form>
    </div>
  );
};

export default CreateComment;

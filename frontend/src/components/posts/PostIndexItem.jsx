import { useDispatch, useSelector } from "react-redux";
import "./PostIndexItem.css";
import PostDropDown from "./PostDropDown";
import CreateComment from "../comments/createComment";
import CommentsIndex from "../comments/commentIndex";
import { fetchComments } from "../../store/reducers/comment";
import { useEffect, useState } from "react";
import comment from "../../assets/image/comment.png";

const PostIndexItem = ({ post, postId }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const allComments = useSelector((state) => state.comments);
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    const postComments = Object.values(allComments).filter(
      (comment) => comment.postId === postId
    );
    setComments(postComments);
  }, [allComments, postId]);

  const handleComment = (body) => {
    const newComment = {
      body,
      user: { username: "current User" },
    };
    setComments((prevComments) => [...prevComments, newComment]);
  };
  const isCommentButtonDisabled = sessionUser && sessionUser.id === post.userId;

  return (
    <div className="postIndexItem">
      <div className="eachPost">
        <div className="postHeader">
          <div className="icon">
            <i className="fa-solid fa-user-circle fa-3x" />
            <span>{`${post.author.fname} ${post.author.lname}`}</span>
          </div>
          {sessionUser && sessionUser.id === post.userId && (
            <div className="postActions">
              <PostDropDown
                postId={post.id}
                postUserId={post.userId}
                post={post}
              />
            </div>
          )}
        </div>
        <p>{post.body}</p>

        {post.photoUrl && (
          <img
            className="image"
            src={post.photoUrl}
            alt="img"
            width={550}
            height={563}
          />
        )}
        <div className="buttons">
          <button onClick={() => setShow(true)}>
            <img src={comment} />
            <span>Comment</span>
          </button>
        </div>
        <div className="addComment">
          {show && (
            <>
              <CreateComment
                postId={post.id}
                postUserId={post.userId}
                onAddComments={handleComment}
              />
              <CommentsIndex postUserId={post.userId} comments={comments} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostIndexItem;

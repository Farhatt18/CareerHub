import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPost,
  fetchPost,
  createPost,
  updatePost,
} from "../../store/reducers/post";

const PostForm = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const post = useSelector(selectPost(postId));
  const [content, setContent] = useState("");

  useEffect(() => {
    if (postId) {
      dispatch(fetchPost(postId));
    }
  }, [dispatch, postId]);

  useEffect(() => {
    if (postId && post) {
      setContent(post.content);
    }
  }, [postId, post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (postId) {
      dispatch(updatePost({ id: postId, ...content }));
    } else {
      dispatch(createPost({ content }));
    }
    // history.push("/posts");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button className={content ? "active" : ""}>
        {postId ? "Update Post" : "Post"}
      </button>
    </form>
  );
};

export default PostForm;

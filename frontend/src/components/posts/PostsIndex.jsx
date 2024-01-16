import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "./PostForm";
import PostIndexItem from "./PostIndexItem";
import { selectArray, fetchPosts } from "../../store/reducers/post";
import "./Post.css";

const PostIndex = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectArray);

  useEffect(() => {
    dispatch(fetchPosts);
  }, [dispatch]);

  return (
    <div className="post-index-container">
      <PostForm />
      <ul>
        {posts.map((post) => {
          <PostIndexItem key={post.id} post={post} />;
        })}
      </ul>
    </div>
  );
};
export default PostIndex;

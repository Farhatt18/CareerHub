import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PostForm from "./PostForm";
import PostIndexItem from "./PostIndexItem";
import { fetchPosts, selectPosts } from "../../store/reducers/post";
// import Modal from "../Modal/modal";

const PostIndex = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="allPostContainer">
      <ul>
        {posts.map((post) => {
          if (post && post.id) {
            return <PostIndexItem key={post.id} post={post} postId={post.id} />;
          }
          return null;
        })}
      </ul>
    </div>
  );
};
export default PostIndex;

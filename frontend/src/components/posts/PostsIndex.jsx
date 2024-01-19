import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PostForm from "./PostForm";
import PostIndexItem from "./PostIndexItem";
import { fetchPosts, selectArray } from "../../store/reducers/post";
// import Modal from "../Modal/modal";

const PostIndex = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectArray);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="allPostContainer">
      <ul>
        {posts.map((post) => {
          return post.id ? <PostIndexItem key={post.id} post={post} /> : null;
        })}
      </ul>
    </div>
  );
};
export default PostIndex;

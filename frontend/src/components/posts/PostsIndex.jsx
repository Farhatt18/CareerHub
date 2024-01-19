import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PostForm from "./PostForm";
import PostIndexItem from "./PostIndexItem";
import { selectArray, fetchPosts } from "../../store/reducers/post";
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
          return <PostIndexItem key={post.id} post={post} />;
        })}
      </ul>
    </div>
  );
};
export default PostIndex;

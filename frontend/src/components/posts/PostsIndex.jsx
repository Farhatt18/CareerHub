import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PostForm from "./PostForm";
import PostIndexItem from "./PostIndexItem";
import { fetchPosts, selectPosts } from "../../store/reducers/post";
// import Modal from "../Modal/modal";

const PostIndex = ({ type, userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  // const [visiblePosts, setVisiblePosts] = useState(1);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // const loadMorePosts = () => {
  //   setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 1);
  // };

  return (
    <>
      {type === "feed" && (
        <div className="allPostContainer">
          <ul>
            {posts
              .slice()
              .reverse()
              .map((post) => {
                if (post && post.id) {
                  return (
                    <PostIndexItem key={post.id} post={post} postId={post.id} />
                  );
                }
                return null;
              })}
          </ul>
        </div>
      )}

      {type === "profile" && (
        <div className="allPostContainer">
          <ul>
            {posts
              .slice()
              .reverse()
              .map((post) => {
                if (post && post.id && userId === post.userId) {
                  return (
                    <PostIndexItem key={post.id} post={post} postId={post.id} />
                  );
                }
                return null;
              })}
          </ul>
          {/* {type === "profile" && visiblePosts < posts.length && (
            <button onClick={loadMorePosts} className="loadBtn">
              Load more Posts
            </button>
          )} */}
        </div>
      )}
    </>
  );
};
export default PostIndex;

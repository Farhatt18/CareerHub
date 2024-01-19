import * as postModalActions from "../../store/reducers/modals";
import Modal from "../Modal/modal";
import { useDispatch } from "react-redux";
import PostForm from "./postForm";

const PostModal = () => {
  const dispatch = useDispatch();
  // const showModal = useSelector((state) => state.modals.showModal);

  const closeModal = () => {
    dispatch(postModalActions.hideModal());
  };
  return (
    <Modal>
      <div className="postModal">
        <PostForm onClose={closeModal} />
      </div>
    </Modal>
  );
};

export default PostModal;

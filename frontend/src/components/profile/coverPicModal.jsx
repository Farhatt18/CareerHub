import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as modalActions from "../../store/reducers/modals";
import Modal from "../Modal/modal";
import photo from "../../assets/image/photo.png";
import "./coverPicModal.css";
import { updateCoverPicture } from "../../store/reducers/users";

const CoverPicModal = () => {
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);
  const userId = useSelector((state) => state.session.user.id);
  const coverPic = useSelector((state) => state.session.user.coverPic);

  useEffect(() => {
    setPhotoFile(null);
  }, [userId]);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", userId);
    if (photoFile) {
      formData.append("user[cover_pic]", photoFile);
    }
    dispatch(updateCoverPicture(formData));
    dispatch(modalActions.hideModal());
  };
  const handlefile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);
  };

  return (
    <Modal className="coverPicModal">
      <div className="headerBox">
        <h2>Background Photo</h2>
        <button onClick={handleClose}>X</button>
      </div>

      {photoFile || coverPic ? (
        <div>
          <img
            src={photoFile ? URL.createObjectURL(photoFile) : coverPic}
            alt="Cover"
            width={500}
            height={300}
            className="profileImg"
          />
        </div>
      ) : null}

      <footer className="imgFooter">
        <label htmlFor="file-input">
          <img src={photo} className="fileImg" />
        </label>
        <input id="file-input" type="file" onChange={handlefile} />

        <div>
          <button onClick={handleSubmit} className="coverPicPost">
            Apply
          </button>
        </div>
      </footer>
    </Modal>
  );
};

export default CoverPicModal;

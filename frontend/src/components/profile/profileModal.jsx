import Modal from "../Modal/modal";
import * as modalActions from "../../store/reducers/modals";
import { useDispatch, useSelector } from "react-redux";
import "./profileModal.css";
import { useEffect, useState } from "react";
import { updateProfilePicture } from "../../store/reducers/users";
import photo from "../../assets/image/photo.png";
const ProfileModal = () => {
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);
  const userId = useSelector((state) => state.session.user.id);
  const photoUrl = useSelector((state) => state.session.user.photoUrl);

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
      formData.append("user[photo]", photoFile);
    }
    dispatch(updateProfilePicture(formData));
    dispatch(modalActions.hideModal());
  };
  const handlefile = ({ currentTarget }) => {
    const file = currentTarget.files[0];
    setPhotoFile(file);
  };

  return (
    <Modal>
      <div className="headerBox">
        <h2>Add Photo</h2>
        <button onClick={handleClose}>X</button>
      </div>

      <>
        {photoFile || photoUrl ? (
          <div>
            <img
              src={photoFile ? URL.createObjectURL(photoFile) : photoUrl}
              alt="profile"
              width={400}
              height={400}
              className="profileImg"
            />
          </div>
        ) : (
          <div className="photoBox">
            <p>No professional headshot needd!</p>
            <p>Just something that represents you.</p>
            <img src="https://static.licdn.com/aero-v1/sc/h/c5ybm82ti04zuasz2a0ubx7bu" />
            <p className="littlePara">
              On LinkedIn, we require members to use their real identities, so
              take or upload a photo of yourself. Then crop, filter, and adjust
              it to perfection.
            </p>
          </div>
        )}
      </>
      <footer className="imgFooter">
        <label htmlFor="file-input">
          <img src={photo} className="fileImg" />
        </label>
        <input id="file-input" type="file" onChange={handlefile} />

        <div>
          <button onClick={handleSubmit}>Upload Photo</button>
        </div>
      </footer>
    </Modal>
  );
};

export default ProfileModal;

import Modal from "../Modal/modal";
import * as modalActions from "../../store/reducers/modals";
import { useDispatch } from "react-redux";
import "./profileModal.css";
import { useState } from "react";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const [photoFile, setPhotoFile] = useState(null);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal());
  };

  const handleFooter = () => {
    if (photoFile) {
      setPhotoFile(photoFile);
    }
  };

  return (
    <Modal>
      <div className="headerBox">
        <h2>Add Photo</h2>
        <button onClick={handleClose}>X</button>
      </div>

      <div className="photoBox">
        <p>No professional headshot needd!</p>
        <p>Just something that represents you.</p>
        <img src="https://static.licdn.com/aero-v1/sc/h/c5ybm82ti04zuasz2a0ubx7bu" />
        <p className="littlePara">
          On LinkedIn, we require members to use their real identities, so take
          or upload a photo of yourself. Then crop, filter, and adjust it to
          perfection.
        </p>
      </div>
      <footer className="imgFooter">
        <input type="file" />

        <div>
          <button onClick={handleFooter}>Upload Photo</button>
        </div>
      </footer>
    </Modal>
  );
};

export default ProfileModal;

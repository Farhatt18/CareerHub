import Modal from "../Modal/modal";

const ProfileModal = () => {
  return (
    <Modal>
      <div className="headerBox">
        <h2>Add Photo</h2>
        <button>X</button>
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
      <footer className="footer">
        <div>
          <input>Upload Photo</input>
        </div>
      </footer>
    </Modal>
  );
};

export default ProfileModal;

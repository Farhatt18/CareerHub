import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import "./ProfilePage.css";
import ProfileModal from "./profileModal";

const ProfilePage = () => {
  const user = useSelector((state) => state.session.user);
  // const [isModalOpen, setModalOpen] = useState();
  const handlePhoto = () => {
    console.log("photo");
    <ProfileModal />;
  };

  return (
    <div className="profilePageWrapper">
      <div className="profilePageHeader">
        <Navigation />
      </div>
      <div className="profilePageContainer">
        <div className="profileBody">
          <div className="imgWrapper">
            <div className="profilePhoto"></div>
            <button className="profileCamera" onClick={handlePhoto}></button>

            <div className="userHeader">
              <div className="currentUser">
                <h1>
                  {user.fname} {user.lname}
                </h1>
              </div>
              {/* <h2>Status</h2> */}
            </div>
          </div>

          <div className="experienceBox">
            <div className="experienceHeader">
              <div className="experience">Experience</div>
              <button> + </button>
            </div>
          </div>
        </div>
        <div className="sideBar">
          <p>Profile language</p>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;

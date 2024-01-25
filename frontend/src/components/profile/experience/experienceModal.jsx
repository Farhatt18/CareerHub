import { useDispatch } from "react-redux";
import * as modalActions from "../../../store/reducers/modals";
import * as experienceActions from "../../../store/reducers/experience";
import { useEffect, useState } from "react";
import Modal from "../../Modal/modal";
const ExperienceModal = ({ userId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userId,
    title: "",
    companyName: "",
    employmentType: "",
    location: "",
    descripation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((preFormData) => ({
      ...preFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(experienceActions.createExperience(formData));

    setFormData({
      userId,
      title: "",
      company: "",
      employmentType: "",
      location: "",
      descripation: "",
    });
    dispatch(modalActions.hideModal());
  };

  const handleCloseBtn = () => {
    dispatch(modalActions.hideModal());
  };
  return (
    <Modal>
      <div className="experienceWrapper">
        <div className="exHeader">
          <h2>Add experience</h2>
          <button className="closeBtn" onClick={handleCloseBtn}>
            X
          </button>
        </div>
        <div>
          <p>* Indicates required</p>
          <div>
            <div>
              <label>
                Title*
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Employment type
                <input
                  type="text"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Company name*
                <input
                  type="text"
                  name="companyName"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Location*
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            {formData.startDate !== undefined && (
              <fieldset>
                <div>
                  <label>
                    Start date*
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </fieldset>
            )}

            <fieldset>
              <div>
                <label>
                  End date*
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.EndDate}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
            </fieldset>
            <div>
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExperienceModal;

import { useDispatch } from "react-redux";
import * as modalActions from "../../../store/reducers/modals";
import * as experienceActions from "../../../store/reducers/experience";
import { useState } from "react";
import Modal from "../../Modal/modal";
import "./experienceModal.css";
const ExperienceModal = ({ userId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userId,
    title: "",
    companyName: "",
    employmentType: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
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
      companyName: "",
      employmentType: "",
      location: "",
      description: "",
      startDate: "",
      endDate: "",
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
        <div className="exBody">
          <p>* Indicates required</p>
          <div className="exForm">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className="type">
              <label>Employment type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="">please select</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="self-employed">Self-employed</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <label>Company name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <fieldset>
              <label>Start date* </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </fieldset>

            <fieldset>
              <label>End date</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </fieldset>
            <div className="descriptionField">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="exFooter">
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ExperienceModal;

import { useDispatch, useSelector } from "react-redux";
import {
  fetchExperiences,
  selectExperiences,
} from "../../../store/reducers/experience";
import { useEffect } from "react";
import ExperienceIndexItem from "./experienceIndexItem";
const ExperienceIndex = ({ userId }) => {
  const dispatch = useDispatch();
  const experiences = useSelector(selectExperiences);

  useEffect(() => {
    dispatch(fetchExperiences(userId));
  }, [dispatch, userId]);

  return (
    <div className="experienceWrapper">
      <ul>
        {experiences.map((experience) => (
          <ExperienceIndexItem
            key={`${experience.id}-${experience.user_id}`}
            experience={experience}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExperienceIndex;

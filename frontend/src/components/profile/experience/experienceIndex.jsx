import { useDispatch, useSelector } from "react-redux";
import { fetchExperiences } from "../../../store/reducers/experience";
import { useEffect } from "react";
import ExperienceIndexItem from "./experienceIndexItem";
const ExperienceIndex = (userId) => {
  const dispatch = useDispatch();
  const experiences = useSelector((state) => state.experiences);

  useEffect(() => {
    dispatch(fetchExperiences(userId));
  }, [dispatch, userId]);

  return (
    <div className="experienceWrapper">
      <ul>
        {experiences.map((experience) => (
          <ExperienceIndexItem key={experience.id} experience={experience} />
        ))}
      </ul>
    </div>
  );
};

export default ExperienceIndex;

import ExperienceDropDown from "./experienceDropDown";
import "./experienceIndexItem.css";
const ExperienceIndexItem = ({ experience }) => {
  const { title, location, description } = experience;

  const companyAndEmployment = `${experience.companyName} · ${experience.employmentType}`;

  return (
    <div className="experienceIndexItem">
      <div className="eachExperience">
        <p className="expTitle">{title}</p>
        <p className="expComEmp">{companyAndEmployment}</p>
        {/* <p>{experience.startDate}</p> */}
        <p className="expLoc">{location}</p>
        <p className="expDes">{description}</p>
      </div>
      <ExperienceDropDown experienceId={experience.id} />
    </div>
  );
};

export default ExperienceIndexItem;

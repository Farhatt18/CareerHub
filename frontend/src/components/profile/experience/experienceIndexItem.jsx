const ExperienceIndexItem = ({ experience }) => {
  return (
    <div>
      <p className="expTitle">{experience.title}</p>
      <p className="expCom">
        {experience.company}
        <span className="expEmp">{experience.employmentType}</span>
      </p>
      {/* <p>{experience.startTime}</p> */}
      <p className="expLoc">{experience.location}</p>
      <p className="expDes">{experience.description}</p>
    </div>
  );
};

export default ExperienceIndexItem;

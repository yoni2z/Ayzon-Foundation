import React from 'react';
import './ProjectDonors.css';

const ProjectDonor = ({ image, name, category }) => {
  return (
    <div className="donor-card">
      <div className="donor-image">
        {image ? <img src={image} alt={`${name} logo`} /> : <div className="donor-image-placeholder"></div>}
      </div>
      <div className="donor-info">
        <strong>{name}</strong>
        <span>{category}</span>
      </div>
    </div>
  );
};

export default ProjectDonor;

import React, { useState } from 'react';
import CircularProgressBar from './CircularProgressBar'; 
import './ComponentsCard.css'; 

const ComponentsCard = ({ name, description, remainingItems, progress, photo, totalItems, color }) => {

    const [compRadius, setcompRadius] = useState(64);
    const [compDimention, setcompDimention] = useState(72); 
    const [compbgDimention, setcompbgDimention] = useState(150); 
    const [compLabel, setcompLabel] = useState("");

  return (
    <div className="card">
      <img src={photo} alt={name} className="card-image" />
      <div className="card-content">
        <div className="content-txt">
          <h3>{name}</h3>
          <p>{description}</p>

          <div className="remaining-items">
            <strong>Remaining items: </strong> {remainingItems}
          </div>

          <div className="total-items">{totalItems} Items</div>
        </div>

        <div className="progress-container">
          <CircularProgressBar
            progress={progress}
            dimention={compDimention}
            bgDimention={compbgDimention}
            radius={compRadius}
            color={color}
          />
        </div>
      </div>
      <button className="donate-button" style={{ backgroundColor: color }}>
        Donate
      </button>
    </div>
  );
};

export default ComponentsCard;

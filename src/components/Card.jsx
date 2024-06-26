import React from 'react'
import "../dist/CardModule.css"
import { useNavigate } from 'react-router-dom';
 //the nbr is to later fetch it from the backend
const Card = ({title,classname,nbr,Icon,Path}) => {
  const navigate =useNavigate();
  const handleNavigation = () => {navigate(Path)};    

  return (
    <div className='card'> 
    <div className={`${classname}-container`} onClick={handleNavigation} style={{cursor:`pointer`, transition:`all 0.5s ease`}}>
        <div className={`${classname}-card `}>
            <div className={`${classname}-content `}><div className='content'>
                <Icon className="icon"/>
                <h3>{title}</h3></div>
                <p>{nbr}</p>
            </div>
        </div>
    </div>
    </div>
  );
};

export default Card;
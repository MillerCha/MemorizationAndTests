import React from "react";


const Card = ({
    key,
    card
}) => {
  
    return (
        <div className="row">
        <h6 className="col">
                {key} - {card.id} - {card.title}
            </h6>
        </div>
    ) ;
};

export { Card };

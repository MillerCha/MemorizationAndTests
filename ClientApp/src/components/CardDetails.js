import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';
import Details from './Details';
import { Droppable } from 'react-beautiful-dnd';
import { Frequency } from './Frequency';
import CardsService from './../services/cards.service';

//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;



const CardDetails = ({ card, saveDetail, addDetails, test }) => {

    const updateFrequency = (frequency) => {
        console.log(frequency);
        CardsService.postCardFrequency( card.id,frequency );

    };

    //const CardsDetails = card.details.map(d => {
    //    return (<ul className="characters">{d.type.name} {d.text}</ul>);
    //})

    if (card.details)
        return (


            <Container>
                <Title>{card.id}</Title>

                <Droppable droppableId={card.id.toString()}>
                    {provided => (


                        <TaskList ref={provided.innerRef}
                            {...provided.droppableProps}
                                             >{/*///TODO rename detail*/}
                            {card.details.map((detail, index) => <Details key={detail.id} detail={detail} index={/*index*/detail.numbering} saveDetail={saveDetail} test={test}/>)}
                            {provided.placeholder}
                        </TaskList>

                    )}
                </Droppable>
                <button type="button" className="btn btn-light col-1" onClick={() => addDetails(card.id)} >add</button>

                <Frequency updateFrequency={updateFrequency} frequency={card.score}></Frequency>



            </Container>


            //<DragDropContext>
            //    <Droppable droppableId="characters">
            //        {(provided) => (



            //            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>


            //                {card.details.map((d, index) => {
            //                    return (
            //                        <Draggable key={d.id} draggableId={d.id} index={index}>
            //                            {(provided) => (


            //                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            //                                    <span>{d.type.name} {d.text}</span>
            //                                </li>

            //                            )}
            //                        </Draggable>



            //                    );



            //                })}

            //            </ul>

            //        )}
            //    </Droppable>

            //</DragDropContext>



        );
    return null;
}

export default CardDetails;

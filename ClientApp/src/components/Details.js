import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';





const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;



const Details = ({ detail, index, saveDetail, detailTypes, test }) => {
    //console.log("d" + detailTypes.length);
    //if (detailTypes[0]) {    console.log( detailTypes[0]);
    //console.log( detailTypes[0].id );}

    const [edit, setEdit] = useState(false);
    const [visible, setVisible] = useState();
    const newTextRef = useRef();
    const newDetailTypeRef = useRef();

    useEffect(() => { setVisible(detail.type && detail.type.visible) }, [detail.type]);

    const saveChanges = () => {
        console.log(newTextRef);
        console.log(newTextRef.current.value);
        const newText = newTextRef.current.value;
        let newDetail = { ...detail };
        newDetail.text = newText;
        newDetail.typeId = parseInt(newDetailTypeRef.current.value);
        newDetail.type = detailTypes.find(d => d.id == newDetailTypeRef.current.value);
        saveDetail([newDetail]);
        setEdit(!edit);
    }

    const detailTypesOptions = detailTypes.map(d => {
        return <option class="dropdown-item" value={d.id}>{d.name}</option>
    });
    const content = { "entityMap": {}, "blocks": [{ "key": "637gr", "text": "Initialized from content state.", "type": "unstyled", "depth": 0, "inlineStyleRanges": [], "entityRanges": [], "data": {} }] };

    if (!test || visible)
        return detail && (//<span>{detail.type.name} {details.text}</span>
            edit ? (<>
                {detailTypes.length}
                <div class="input-group mb-3 p-3">
                    <div class="input-group-prepend">

                        <select class="btn btn-outline-secondary dropdown-toggle" defaultValue={detail.type.id} ref={newDetailTypeRef} onChange={e => { console.log(e); console.log(e.target.value); }}>
                            {detailTypesOptions}
                        </select>


                    </div>
                    <textarea type="text" class="form-control" defaultValue={detail.text} ref={newTextRef} />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={saveChanges} >Save</button>
                        <button class="btn btn-outline-secondary" type="button" onClick={e => { setEdit(!edit); }} >Cancel</button>
                    </div>

                </div>



            </>) :
                <Draggable draggableId={detail.id.toString()} index={index}>
                    {provided => (
                        <Container  {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            <div className="row">
                                {

                                    (<>
                                        <div className="col-10 brk-line text-right" >{detail.type.name} {detail.text} {detail.numbering}</div>
                                        <button type="button" className="btn btn-light col-1" onClick={e => setEdit(!edit)} >edit</button>
                                    </>)
                                }
                            </div>
                        </Container>
                    )}


                </Draggable>


        );
    else
        return (
            <button type="button" class="btn btn-light" onClick={(e) => { setVisible(true); }}>
                {detail.type.name}
            </button>
            
            
            );



}

//export default Details;


export default connect(
    ((state) => { return { detailTypes: state.detailTypes.detailTypes } })
    ,
    null

)(Details);




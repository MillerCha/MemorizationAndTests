import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Card } from "./Card";
import { setSelectedSubjects } from './../../redux/actions/actions';
import { connect } from 'react-redux';



const Subject = ({ SubjectData, subjects, setSelectedSubjects }) => {

    const [isOpen, setIsOpen] = useState(true);

    const SubjectsList = subjects && subjects.map(
        i => {
            if (i.parentSubjectId == SubjectData.id)
                return <SubjectWithReduxProps key={i.id} SubjectData={i} />
        });


    return (
        <div className="Row w-100 " onClick={(e) => {
            setIsOpen(s => !s);
            setSelectedSubjects(SubjectData.id)
            e.stopPropagation();
        }}>
            <div className="Row w-100 borderborder-light">
                <h6 className="col=2">{SubjectData && SubjectData.id} {SubjectData && SubjectData.title}</h6>
            </div>
            <div className="w-100 pl-2">

                {!isOpen && subjects && SubjectsList}
                {/*{!isOpen && Cards && Cards}*/}
            </div>
        </div>
    );
};

const SubjectWithReduxProps = 
connect(
    ((state) => { return { subjects: state.subjects.subjects } })
    ,
    { setSelectedSubjects: setSelectedSubjects }
    )(Subject);

export default SubjectWithReduxProps


import React, { useEffect, useState } from "react";
import axios from 'axios';
import Subject from "./Subject";
import { fetchSubjects } from './../../redux/actions/actions';
import { connect } from 'react-redux';


function Root({ fetchSubjects, subjects }) {
    console.log(subjects);
    //const handleClick = (node) => {
    //    console.log(node);
    //};
    //const handleUpdate = (state) => {
    //    localStorage.setItem(
    //        "tree",
    //        JSON.stringify(state, function (key, value) {
    //            if (key === "parentNode" || key === "id") {
    //                return null;
    //            }
    //            return value;
    //        })
    //    );
    //};

    //useLayoutEffect(() => {
    //    try {
    //        let savedStructure = JSON.parse(localStorage.getItem("tree"));
    //        if (savedStructure) {
    //            setData(savedStructure);
    //        }
    //    } catch (err) {
    //        console.log(err);
    //    }
    //}, []);

   



    useEffect(() => { fetchSubjects() }, []);


    const SubjectsList = subjects && subjects.map(
        i => {
            if (!i.parentSubjectId)
            //return <div>{i.id} {i}</div>
               return <Subject key={i.id} SubjectData={i} />
        });

    return (
        <div className="container">
            <h2>Subjects</h2>
            {SubjectsList && SubjectsList}
        </div>
    );
}


export default connect(
    ((state) => { return { subjects: state.subjects.subjects } })
    ,
    { fetchSubjects: fetchSubjects }
)(Root);

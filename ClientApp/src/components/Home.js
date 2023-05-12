import React, { useState } from 'react';
import Root from '../components/Tree/Root';
import { connect } from 'react-redux';
import CardsContainer from './CardsContainer';


const Home = ({ selectedSubject }) => {
    //static displayName = Home.name;
    const [Test, setTest] = useState(true);

    const hundleclick = () => {
        setTest((testStatus) => { return !testStatus; })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <button type="button" class="btn btn-light" onClick={(e) => hundleclick()}>
                        {Test ? <span>All Cards</span> : <span>Test</span>}
                    </button>
                    {!Test && <Root />}</div>

                <div className="col-8">
                    selectedSubject  {selectedSubject}

                    <CardsContainer test={Test} />
                </div>
            </div>
        </div>
    );

}
export default connect(
    ((state) => { return { selectedSubject: state.subjects.selectedSubject } })
    ,
    null

)(Home);

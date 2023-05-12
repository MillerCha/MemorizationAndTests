import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';
import CardDetails from './CardDetails';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { fetchDetailTypes } from './../redux/actions/actionsDetailTypes';



axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

const CardsContainer = ({ fetchDetailTypes, test }) => {
    const [CardsList, setCardsList] = useState([]);
    const [TestCardsList, setTestCardsList] = useState([]);
    const [OriginalCardsList, setOriginalCardsList] = useState([]);/// TODO לא בשימוש
    const [Saved, setSaved] = useState(false); 



    const loadCards = () => {
        axios.get('/api/Cards').then(response => {
            setCardsList(response.data);
            setOriginalCardsList(response.data);
        });

        axios.get('/api/Cards?test=true').then(response => {
            setTestCardsList(response.data);
        });
    }

    useEffect(loadCards, []);
    useEffect(() => { fetchDetailTypes() }, []);

    const onDragEnd = result => {

        const { destination, source, draggableId } = result;
        let detailTeSave = [];

        if (!destination) {
            return;
        }
        console.log(result);
        console.log(`${destination.index}, ${source.index}, ${draggableId}`);

        if (destination.droppableId == source.droppableId) {

            let CardListCopy = JSON.parse(JSON.stringify(CardsList));
            let CardDetailsListNew = (CardListCopy.filter(c => c.details.filter(d => d.id == draggableId).length > 0))[0]

            CardDetailsListNew.details[source.index - 1].numbering = destination.index;
            CardDetailsListNew.details[source.index - 1].modified = true;
            detailTeSave.push(CardDetailsListNew.details[source.index - 1]);
            CardDetailsListNew.modified = true;

            if (source.index < destination.index) /// move forward
                for (let i = source.index; i < destination.index; i++) {
                    CardDetailsListNew.details[i].numbering = CardDetailsListNew.details[i].numbering - 1;
                    CardDetailsListNew.details[i].modified = true;
                    detailTeSave.push(CardDetailsListNew.details[i]);
                }
            else // move backward
                for (let i = source.index - 2; i >= destination.index - 1; i--) {
                    CardDetailsListNew.details[i].numbering = CardDetailsListNew.details[i].numbering + 1;
                    CardDetailsListNew.details[i].modified = true;
                    detailTeSave.push(CardDetailsListNew.details[i]);


                }

            //CardDetailsListNew.details =
            //CardDetailsListNew.details.sort((firstEl, secondEl) => firstEl.numbering - secondEl.numbering);
            //let cardsListModified = CardsList;
            //const inx = CardsList.find(c => c.id = CardDetailsListNew.id);
            //cardsListModified.splice(inx, 1, CardDetailsListNew)
            //setCardsList(cardsListModified);
            SaveDetail(detailTeSave);
            //SaveChanges
            //setCardsList(CardListCopy);
        }

    };

    const SaveChanges = (cardId) => {
        const cards = CardsList.filter(c => (cardId && cardId == c.id) || (c.modified))
        let data = [];
        cards.forEach(c => {
            let detalisArr = c.details.filter(d => d.modified);
            data = data.concat(detalisArr)

        });
        axios.put('/api/Details', data).then(response => {
            console.log(response);
            setSaved(true);
            setInterval(() => { setSaved(false); }, 5000);
        });
    }

    const SaveDetail = (newDetail) => {
        let newCardsList = JSON.parse(JSON.stringify(CardsList));

        //LOGIC MOVE TO AddDetails
        //if (newDetail.length === 1 && !newDetail[0].id) {

        //    let card = newCardsList.find(c => (newDetail[0].cardId == c.id));
        //    let detail = card.details.find(d => d.id == newDetail[0].id);
        //    detail.modified = true;
        //    detail.text = newDetail[0].text;
        //    detail.typeId = newDetail[0].typeId;
        //    detail.numbering = newDetail[0].numbering;

        //    const newobjdetail = { text: newDetail[0].text, typeId: newDetail[0].typeId, cardId: newDetail[0].cardId, numbering: newDetail[0].numbering };
        //    //card.details.concat(newDetail);
        //    axios.post('/api/Details', newobjdetail).then(response => {
        //        console.log(response);
        //        setSaved(true);
        //        setInterval(() => { setSaved(false); }, 5000);
        //        detail.type = newDetail[0].type;
        //        setCardsList(newCardsList);
        //    });

        //}

       // else {
            let details = [];
            newDetail.forEach(item => {
                let card = newCardsList.find(c => (item.cardId == c.id));
                let detail = card.details.find(d => d.id == item.id);
                detail.modified = true;
                detail.text = item.text;
                detail.typeId = item.typeId;
                detail.numbering = item.numbering;
                card.details.sort((firstEl, secondEl) => firstEl.numbering - secondEl.numbering);
                detail.type = item.type;
                details.push(detail);
               //details.push(JSON.parse(JSON.stringify(detail)));

                //
            });
            console.log(details);

            axios.put('/api/Details', details).then(response => {
                console.log(response);
                setSaved(true);
                setInterval(() => { setSaved(false); }, 5000);
                //
                setCardsList(newCardsList);
            });
      //  }

    }

    const AddDetails = (cardID) => {
        let newCardsList = JSON.parse(JSON.stringify(CardsList));
        let card = newCardsList.find(c => (cardID == c.id));
        const newDetail = {
            card: null,
            cardId: cardID,
            id: 0,
            numbering: card.details.length + 1,
            text: null,
            type: { id: 1, name: "שאלה", visible: false, details: null },
            typeId: 1,
        };

        card.details = card.details.concat(newDetail);

        axios.post('/api/Details', newDetail).then(response => {
            console.log(response);
            newDetail.id = response.data.id;
            setSaved(true);
            setInterval(() => { setSaved(false); }, 5000);
            setCardsList(newCardsList);
        });
        //setCardsList(newCardsList);

    }

    const addCard = (subjectId) => {
        const newobjCard = {
            title: "6",
            subjectId: subjectId,
            details: [{ text: null, typeId: 1, numbering: 1 }]
        };
        //card.details.concat(newDetail);
        axios.post('/api/Cards', newobjCard).then(response => {
            console.log(response);
            setCardsList((oldCardsList) => {
                //oldCardsList.push(response.data);
                return [...oldCardsList, response.data];
            });
        });
    }

    const CardsDetails = test ? TestCardsList && TestCardsList.map(c => {
        return <CardDetails key={c.id} card={c} saveDetail={SaveDetail} addDetails={AddDetails} test={test} />;
    }) :
        CardsList && CardsList.map(c => {
            return <CardDetails test={test} key={c.id} card={c} saveDetail={SaveDetail} addDetails={AddDetails} />;
        })
        ;

    return (
        <div >
            {Saved && <div className="alert alert-secondary" role="alert">saved</div>}

            <button type="button" className="btn btn-light col-1" onClick={() => addCard(4)} >add</button>

            <button type="button" className="btn btn-light" onClick={e => SaveChanges()}>save</button>
            <DragDropContext onDragEnd={onDragEnd}>
                {CardsDetails && CardsDetails}
            </DragDropContext>

        </div>
    );
};

//export default CardsContainer;

export default connect(
    null
    ,
    { fetchDetailTypes: fetchDetailTypes }
)(CardsContainer);



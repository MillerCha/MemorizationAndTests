import axios from 'axios';


class CardsService {

    /**
     * @returns {Promise<Task[]>}
     */
    postCardFrequency = async (cardID, frequency, setSaved) => {

        //const newFrequency = {
        //    frequency: frequency,
        //    cardId: cardID            
        //};

        //axios.put('/api/Cards/Frequency/3', '20' ).then(response => {
        //    console.log(response);
        //    setSaved(true);
        //    setInterval(() => { setSaved(false); }, 5000);
        //    return response
            
        //});

        const response = await fetch('/api/Cards/Frequency/3',
            {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: '20',
            }
        );
        console.log(await response.json());



    }
}

export default new CardsService();
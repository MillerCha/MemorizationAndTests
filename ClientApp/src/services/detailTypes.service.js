
class detailTypesService {

    /**
     * @returns {Promise<Task[]>}
     */
    fetchDetailTypes = async () => {
        const response = await fetch('api/TypesDetails');
        const detailTypes = await response.json();
        console.log(detailTypes);
        return detailTypes;
    }
}

export default new detailTypesService();
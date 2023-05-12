class subjectsService {

    /**
     * @returns {Promise<Task[]>}
     */
    fetchSubjects = async () => {
        const response = await fetch('/api/Subjects');
        const subjects = await response.json();
        console.log(subjects);
        return subjects;
    }
}

export default new subjectsService();
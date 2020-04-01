export default {

    getAll() {
        return fetch('http://localhost:8081/coll/getAll', {
            method: 'GET',
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    },

    getAllMatricule() {
        return fetch('http://localhost:8081/coll/getAllMatricule', {
            method: 'GET',
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    },

    getAllFicheByMatricule(matricule) {
        return fetch(`http://localhost:8081/coll/getAllByMatricule?matricule=${matricule}`, {
            method: 'GET',
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    },

    deleteFicheById(id) {
       fetch(`http://localhost:8081/coll/deleteFicheById?id=${id}`, {
           method : 'DELETE'
       });
    },

    updateFiche(value) {
        let myHeaders = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
        });
        fetch('http://localhost:8081/coll/updateById', {
            method : 'PUT',
            headers : myHeaders,
            body : JSON.stringify(value),
        });
    }
}

import ApiService from "./ApiService";

export default {

    getAll() {
        return fetch(`${ApiService.API_ENDPOINT}/coll/getAll`, {
            method: 'GET',
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    },

    getAllMatricule() {
        return fetch( `${ApiService.API_ENDPOINT}/coll/getAllMatricule`, {
            method: 'GET',
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    },

    getAllFicheByMatricule(matricule) {
        return fetch(`${ApiService.API_ENDPOINT}/coll/getAllByMatricule?matricule=${matricule}`, {
            method: 'GET',
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    },

    deleteFicheById(id) {
       fetch(`${ApiService.API_ENDPOINT}/coll/deleteFicheById?id=${id}`, {
           method : 'DELETE'
       });
    },

    updateFiche(value) {
        let myHeaders = new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
        });
        fetch(`${ApiService.API_ENDPOINT}/coll/updateById`, {
            method : 'PUT',
            headers : myHeaders,
            body : JSON.stringify(value),
        });
    },

    getFicheById(id) {
        return fetch(`${ApiService.API_ENDPOINT}/coll/getById?id=${id}`, {
            method: 'GET',
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    },

    getAllByYear(year) {
        return fetch(`${ApiService.API_ENDPOINT}/coll/getAllByYear?year=${year}`,{
            method : 'GET'
        }).then((response) => response.json())
            .then((data) => {
                return data;
            })
    }
}

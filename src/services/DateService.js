export default {
    stats : {
        totalWK : 0,
        totalJourOuvre : 0,
        totalJour : 0,
        joursFerie : [],
        yearCurrent : 0
    },

    setYearCurrent(year) {
      this.stats.yearCurrent = year;
    },


    getFerie(year) {
        this.stats.joursFerie = [];
        fetch(`https://jours-feries-france.antoine-augusti.fr/api/${year}`, {
            method: 'GET'
        }).then((response) => response.json())
            .then((data) => {
                data.forEach((d) => {
                    if(d.nom_jour_ferie !== "Lundi de Pentecôte") {
                        this.stats.joursFerie.push(new Date(`${d.date}T00:00:00`));
                    }
                })

            });
    },

    getStatsDate(form, flagConge) {
        let dateIn = new Date(`${form.date_entree}T00:00:00`);
        let dateOut = new Date(`${form.date_sortie}T00:00:00`);
        console.log(dateIn, dateOut);
        let collab = {
            id : form.id,
            nom : form.nom.toUpperCase(),
            matricule : form.matricule,
            prenom : form.prenom.toUpperCase(),
            totalCongeAnciennete : form.totalCongeAnciennete,
            penalisationConge : form.penalisationConge,
            date_entree : form.date_entree,
            date_sortie : form.date_sortie,
            heure_hebdomadaire : form.heure_hebdomadaire,
            debut_periode : new Date(form.year, 0, 1, 10).toISOString().substr(0,10),
            service : form.service,
            statut : form.statut,
            totalJour : 0,
            totalConge : 0,
            totalWe : 0,
            totalJourFerie : 0,
            totalJourTravail : 0,
            totalSemaine : 0,
            totalHeure : 0,
            totalMinDay : 0,
            totalDayProra : 0,
            totalWorkPeriod : 0,
            totalRtt : 0,
            avenant : 0,
            year : form.year,
            commentaire : form.commentaire,
            reporte : form.reporte,
        };



        collab.totalConge = (flagConge) ? this.calculJourConge(dateIn, dateOut, collab.year): form.totalConge;

        //let totalWorkingDay = 0;
        let datePlafond = new Date(collab.year, 0,1);
        if(dateIn > datePlafond) {
            datePlafond = dateIn;
        }

        while(datePlafond <= dateOut ) {
            collab.totalJour++;
            if(datePlafond.getDay() === 0 || datePlafond.getDay() === 6) {
                collab.totalWe++;
            }else if(this.isHoliday(datePlafond)) {
                collab.totalJourFerie++;
            }
            datePlafond.setFullYear(datePlafond.getFullYear(), datePlafond.getMonth(), datePlafond.getDate()+1);
        }

        let flag = (collab.statut === 'Admin heure');

        collab.totalJour = (collab.totalJour === 366) ? 365 : collab.totalJour;
        collab.totalWe = (collab.totalWe === 104) ? 105 : collab.totalWe;

        collab.totalJourTravail = collab.totalJour-collab.totalWe-collab.totalJourFerie-collab.totalCongeAnciennete-collab.penalisationConge-collab.totalConge;
        collab.totalSemaine = collab.totalJourTravail/5;
        collab.totalHeure = (flag) ? collab.totalSemaine*collab.heure_hebdomadaire + parseInt(collab.reporte) : collab.totalSemaine*collab.heure_hebdomadaire;
        let minDayTmp = collab.totalHeure/8;
        collab.totalMinDay = Math.ceil(minDayTmp);
        collab.totalDayProra = (5*collab.heure_hebdomadaire)/35*(collab.totalJour/365);
        collab.totalWorkPeriod = collab.totalMinDay + collab.totalDayProra + parseInt(collab.reporte);
        collab.totalRtt = this.getRtt(collab.statut, collab.totalWorkPeriod, collab.totalHeure);
        collab.avenant = (collab.statut === 'Enseignant') ? 10*collab.totalJour/365*collab.heure_hebdomadaire/35 : 0;
        return collab;
    },

    isHoliday(date) {
        let flag = false;
        this.stats.joursFerie.forEach((d) => {
           if(this.dateEquals(d, date)) {
               flag = true;
           }
       });
       return flag;
    },

    dateEquals(date1, date2) {
        if(date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()) {
            return true;
        }else {
            return false;
        }
    },

    calculJourConge(dateIn, dateOut, year) {
        let coeff = (this.statut === 'Enseignant') ? 3.333 : 2.5;
        let dateFlag;
        let dateFlagOut;
        if(this.statut === 'Enseignant') {
            dateFlag = new Date(year, 0,1);
            dateFlagOut = new Date(year, 11, 31);
        }else {
            dateFlag = new Date(year-1, 4, 31);
            dateFlagOut = new Date(year, 4, 31);
        }
        let res = 0;
        let dateTmpIn = new Date(dateIn.getFullYear(), dateIn.getMonth(), 1);
        let dateTmpOut = new Date(dateOut.getFullYear(), dateOut.getMonth(), 1);
        if(dateIn > dateFlag && dateIn < dateFlagOut) {
            res += ((30-dateIn.getDate()+1)*coeff)/30;
            dateTmpIn.setFullYear(dateTmpIn.getFullYear(), dateTmpIn.getMonth()+1, 1);
        }
        if(dateOut > dateFlag && dateOut < dateFlagOut) {
            res += (dateOut.getDate()*coeff)/30;
            dateTmpOut.setFullYear(dateTmpOut.getFullYear(), dateTmpOut.getMonth()-1, 1);
        }
        while(dateTmpIn <= dateTmpOut) {
            if(dateTmpIn > dateFlag && dateTmpIn < dateFlagOut) {
                res += coeff
            }
            dateTmpIn.setFullYear(dateTmpIn.getFullYear(), dateTmpIn.getMonth()+1, 1);
        }
        return Math.ceil(res);
    },

    getRtt(statut, totalWorkPeriod, totalHour) {
        if(statut === 'Admin jour') {
            let rttJour = Math.ceil((22*totalWorkPeriod)/200);
            return (rttJour > 22) ? 22 : rttJour;
        }else if(statut === 'Admin heure') {
            let rttHeure = Math.ceil((27*totalHour)/1554);
            return (rttHeure > 27) ? 27 : rttHeure;
        }else if(statut === 'Enseignant') {
            let rttEns = Math.ceil((12*totalWorkPeriod)/200);
            return (rttEns > 12) ? 12 : rttEns;
        }
    }
}

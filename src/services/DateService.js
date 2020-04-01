export default {
    stats : {
        totalWK : 0,
        totalJourOuvre : 0,
        totalJour : 0,
        joursFerie : [],
        yearCurrent : 0
    },



    getFerie(year) {
        this.stats.yearCurrent = year;
        this.stats.joursFerie = []
        fetch(`https://jours-feries-france.antoine-augusti.fr/api/${year}`, {
            method: 'GET'
        }).then((response) => response.json())
             .then((data) => {
                 data.forEach((d) => {
                     if(d.nom_jour_ferie !== "Lundi de Pentecôte") {
                         console.log(d)
                         this.stats.joursFerie.push(new Date(`${d.date}T00:00:00`));
                     }
                 })

             })
    },

    getStatsDate(start, end) {
        let stats = {
            totalWeekEnd : 0,
            totalWorkingDay : 0,
            totalHoliday : 0,
            totalDay : 0
        }

        //let totalWorkingDay = 0;
        let datePlafond = new Date(this.stats.yearCurrent, 0,1);
        if(start > datePlafond) {
            datePlafond = start;
        }
        while(datePlafond <= end ) {
            stats.totalDay++;
            if(datePlafond.getDay() === 0 || datePlafond.getDay() === 6) {
                stats.totalWeekEnd++;
            }else if(this.isHoliday(datePlafond)) {
                stats.totalHoliday++;
            }else{
                stats.totalWorkingDay++;
            }
            datePlafond.setFullYear(datePlafond.getFullYear(), datePlafond.getMonth(), datePlafond.getDate()+1);
        }
        stats.totalDay = (stats.totalDay === 366) ? 365 : stats.totalDay;
        stats.totalWeekEnd = (stats.totalWeekEnd === 104) ? 105 : stats.totalWeekEnd;
        return stats;
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
    }
}

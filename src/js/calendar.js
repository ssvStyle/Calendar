window.addEventListener('DOMContentLoaded', () => {
    let monthBlock = document.getElementById('month'),
          yearBlock = document.getElementById('yearBlock'),
          calendarBlock = document.getElementById('calendar');

    /**
     * class Calendar
     */
    class Celendar {

        /**
         * All name of month in rus lang
         *
         * @type {string[]}
         */
        rusMonth = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
        /**
         * All name of month in eng lang
         *
         * @type {string[]}
         */
        engMonth = ["January","February","March","April","May","June","July", "August","September","October","November","December"];
        daysBlock = document.getElementsByClassName('day');

        forWeeks = [];

        constructor(date, month, year) {
            this.date = date;
            this.month = month;
            this.year = year;
        }

        nextMonth() {
            this.month++;
            if(this.month > 11){
                this.year++;
                this.month = 0;
            }
            return this;
        }

        prevMonth () {
            this.month = this.month -1;
            if(this.month < 0){
                this.year--;
                this.month = 11;
            }

            return this;
        }

        getMonth() {
            return this.rusMonth[this.month];
        }

        getYear() {
            return this.year;
        }

        prevMonthDays() {

            this.date.setFullYear(this.year, this.month, 1);
            let emptyDay = this.date.getDay()-1;


            if(emptyDay <= 0){
                emptyDay = 6;
            }

            let daysInPrevMonth = new Date(this.year, this.month, 0).getDate();

            for (let i = daysInPrevMonth - emptyDay+1; i <= daysInPrevMonth; i++) {
                this.forWeeks.push(i);
            }
        }

        daysCounter() {
            this.prevMonthDays();
            let daysInMonth = new Date(this.year, this.month+1, 0).getDate();

            for (let i = 1; i <= daysInMonth; i++) {
                this.forWeeks.push(i);
            }
            this.nextMonthDays();
        }

        showDays() {

            this.daysCounter();

            let i = 0;
            while (i < this.daysBlock.length) {
                this.daysBlock[i].innerHTML = this.forWeeks[i];
                i++;
            }
        }

        nextMonthDays() {
            let length = this.daysBlock.length - this.forWeeks.length;

            let i = 1;

            let lastDay = this.forWeeks[this.forWeeks.length -1];

            while (i <= length) {
                    this.forWeeks.push(new Date(this.year, this.month, lastDay+i).getDate());
                    i++;
                }

        }

    }

    const  date = new Date();

    let celendar = new Celendar(date, date.getMonth(), date.getFullYear());



    calendarBlock.addEventListener('click', (event) => {

        switch (event.target.id) {
            case 'nextMonth':
                celendar = new Celendar(date, date.getMonth(), date.getFullYear());
                celendar.nextMonth().showDays();
                yearBlock.innerText = celendar.getYear();
                monthBlock.innerText = celendar.getMonth();
                break;
            case 'prevMonth':
                celendar = new Celendar(date, date.getMonth(), date.getFullYear());
                celendar.prevMonth().showDays();
                yearBlock.innerText = celendar.getYear();
                monthBlock.innerText = celendar.getMonth();
                break;

        }
        //console.log(event.target.id);
    });

    celendar.showDays(yearBlock);
    yearBlock.innerHTML = celendar.getYear();
    monthBlock.innerHTML = celendar.getMonth();
    console.log(celendar.getYear());

});
/*
 * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
 * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
 */
// const days = Math.floor(time / (1000 * 60 * 60 * 24));

/*
 * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
 * остатка % и делим его на количество миллисекунд в одном часе
 * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
//  */
// const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

/*
 * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
 * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
 */
// const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

/*
 * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
 * миллисекунд в одной секунде (1000)
//  */
// const secs = Math.floor((time % (1000 * 60)) / 1000);

class CountdownTimer{
    constructor({selector, targetDate}) {
        this.selector = document.querySelector(selector);
        this.targetDate = targetDate;
        
        this.refs = {
        days: this.selector.querySelector('[data-value="days"]'),
        hours: this.selector.querySelector('[data-value="hours"]'),
        mins: this.selector.querySelector('[data-value="mins"]'),
        secs: this.selector.querySelector('[data-value="secs"]')
    }
    }

    getTimeOpts = () => {
        setInterval(() => {
            const timeDiff = this.getDiffTime();
            const timeOpts = this.getTime(timeDiff);
            this.renderTimerData(timeOpts);
        }, 1000)
    }

    getDiffTime = () => this.targetDate - Date.now();

    getDays = (time) => Math.floor(time / (1000 * 60 * 60 * 24))
    getHours = (time) => Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    getMins = (time) =>Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    getSecs = (time) => Math.floor((time % (1000 * 60)) / 1000)

    getTime = (time) => {
        return {
            days: this.getDays(time),
            hours: this.getHours(time),
            mins: this.getMins(time),
            secs: this.getSecs(time),
        }
    }
    renderTimerData = timeOpts => {
        const { days, hours, mins, secs } = timeOpts;
        this.refs.days.textContent = days ;
        this.refs.hours.textContent = hours < 10 ? `0${hours}` : hours;
        this.refs.mins.textContent = mins < 10 ? `0${mins}` : mins;
        this.refs.secs.textContent = secs < 10 ? `0${secs}` : secs;
    }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2022'),
});

timer.getTimeOpts()
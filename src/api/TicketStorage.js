const TICKET_KEY = 'b2b-ticket-obj';

export default {
    expireTimeTicket: 24,

    saveTicket(obj) {
        let data = {
            expire: new Date().getTime(),
            ticket: obj
        };
        window.localStorage.setItem(TICKET_KEY, JSON.stringify(data));
    },

    loadTicket() {
        let data = window.localStorage.getItem(TICKET_KEY);
        if (data) {
            let result = JSON.parse(data);
            if(this.compareTime(result.expire)) {
                result.expire = new Date().getTime();
                window.localStorage.setItem(TICKET_KEY, JSON.stringify(result));
                return result.ticket;
            }
        }
        return false;
    },


    clearTicket() {
        window.localStorage.removeItem(TICKET_KEY);
    },

    compareTime(time) {
        let now = new Date().getTime();
        let diff = now - time;
        return diff < 3600000 * this.expireTimeTicket;
    },
}

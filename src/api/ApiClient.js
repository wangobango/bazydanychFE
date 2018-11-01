import { EventEmitter } from 'events'
import http from 'superagent'
import ticketStorage from './TicketStorage'

export const apiEmitter = new EventEmitter();
const TICKET_HEADER = "Ticket";

export const EXPIRED_TICKED = 'expired_ticket';
export const API_START = 'api_start';
export const API_STOP = 'api_stop';
export const POST_RESPONSE_EVENT = 'post:response';
export const POST_ERROR_EVENT = 'post:error';


export default {
    host: 'https://localhost:8080',

    get(resource, query) {
        resource = `${this.host}/${resource}`;
        query = this.buildQueryTime(query);

        apiEmitter.emit(API_START);
        return new Promise((resolve, reject) => {
            let ticket = this.getTicket();
            if (ticket) {
                http
                    .get(resource)
                    .set('Accept', 'application/json')
                    .set(TICKET_HEADER, ticket.ticket)
                    .type('json')
                    .query(query)
                    .end((err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res.body);
                        }
                        apiEmitter.emit(API_STOP);
                    });
            } else {
                reject(EXPIRED_TICKED);
            }
        });
    },

    post(resource, data) {
        resource = `${this.host}/${resource}?v=1`;
        apiEmitter.emit(API_START);

        return new Promise((resolve, reject) => {
            let ticket = this.getTicket();
            if (ticket) {
                http
                    .post(resource)
                    .set('Accept', 'application/json')
                    .set(TICKET_HEADER, ticket.ticket)
                    .type('json')
                    .send(data)
                    .end((err, res) => {
                        if (err) {
                            err.response = res;
                            apiEmitter.emit(POST_ERROR_EVENT, res);
                            apiEmitter.emit(API_STOP);
                            reject(err)
                        } else {
                            apiEmitter.emit(POST_RESPONSE_EVENT, res);
                            resolve(res.body);
                            apiEmitter.emit(API_STOP);
                        }
                    })
            } else {
                reject(EXPIRED_TICKED);
            }
        })
    },


    postWithoutTicket(resource, data) {
        resource = `${this.host}/${resource}?v=1`;
        apiEmitter.emit(API_START);

        return new Promise((resolve, reject) => {
            http
                .post(resource)
                .set('Accept', 'application/json')
                .type('json')
                .send(data)
                .end((err, res) => {
                    if (err) {
                        err.response = res;
                        apiEmitter.emit(POST_ERROR_EVENT, res);
                        apiEmitter.emit(API_STOP);
                        reject(err)
                    } else {
                        apiEmitter.emit(POST_RESPONSE_EVENT, res);
                        resolve(res.body);
                        apiEmitter.emit(API_STOP);
                    }
                })
        })
    },



    buildQueryTime(query) {
        let date = new Date();
        if (!query) {
            query = {time: date.getTime()};
        } else {
            query.time = date.getTime();
        }
        return query;
    },

    async createTicket(params) {
        if (params.expireTicket > 0) {
            ticketStorage.expireTimeTicket = params.expireTicket;
        }
        let res = ticketStorage.loadTicket();
        if (!res) {
            res = await this.postWithoutTicket("shop/createticket", params);
            ticketStorage.saveTicket(res);
        }
        return res;
    },

    async signin(params) {
        let ticket = this.getTicket();
        if (ticket) {
            const res = await this.post("authorization/signin", params);
            ticket.ticket = res.ticket;
            ticket.user = res.user;
            ticketStorage.saveTicket(ticket);
            return res;
        }
        return null;
    },

    getTicket() {
        let res = ticketStorage.loadTicket();
        if (!res) {
            apiEmitter.emit(EXPIRED_TICKED);
        }
        return res;
    },

    signout() {
        ticketStorage.clearTicket();
    },

}

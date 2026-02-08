/// <reference types="cypress"/>

describe('Update booking', () => {

    var token = '';
    var bookingid = ''

    before('Login', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {

                "username": "admin",
                "password": "password123"

            }
        })

            .then((response) => {
                expect(response.status).to.equal(200)
                token = response.body.token;
            })
    })
    beforeEach('create Booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {
                "firstname": "Weslley Alterado",
                "lastname": "Nogueira",
                "totalprice": 9000,
                "depositpaid": true,
                "bookingdates":
                {
                    "checkin": "2026-01-01",
                    "checkout": "2026-01-09"
                },
                "additionalneeds": "Teste"
            }

        })
            .then((response) => {
                expect(response.status).to.equal(200)
                expect(response.body.bookingid).not.to.null
                expect(response.body.booking.totalprice).to.equal(9000)
                bookingid = response.body.bookingid
            })


    })

    it('Updade Booking', () => {
        console.log('Passou no IT ' + token)

        cy.request({

            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            body: {
                "firstname": "Weslley Alterado",
                "lastname": "Nogueira",
                "totalprice": 7000,
                "depositpaid": true,
                "bookingdates":
                {
                    "checkin": "2026-01-01",
                    "checkout": "2026-01-09"
                },
                "additionalneeds": "Teste"
            }, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                //'Cookie':   'token=' + token
                'Cookie': `token=${token}`

            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.totalprice).to.equal(7000)

        })


    })
    it('Updade Booking', () => {
        console.log('Passou no IT ' + token)

        cy.request({

            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/' + bookingid,
            body: {
                "firstname": "Weslley Alterado",
                "lastname": "Nogueira",
                "totalprice": 9000,
                "depositpaid": true,
                "bookingdates":
                {
                    "checkin": "2026-01-01",
                    "checkout": "2026-01-09"
                },
                "additionalneeds": "Teste"
            }, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=' + token
            }
        })


    })

    it('Updade Booking sem o token', () => {
        console.log('Passou no IT ' + token)

        cy.request({

            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/1984',
            failOnStatusCode: false,
            body: {
                "firstname": "Weslley Alterado",
                "lastname": "Nogueira",
                "totalprice": 9000,
                "depositpaid": true,
                "bookingdates":
                {
                    "checkin": "2026-01-01",
                    "checkout": "2026-01-09"
                },
                "additionalneeds": "Teste"
            }, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        })


    })

    it('Updade Booking com o token inválido', () => {
        console.log('Passou no IT ' + token)

        cy.request({

            method: 'PUT',
            url: `https://restful-booker.herokuapp.com/booking/${bookingid}`,
            failOnStatusCode: false,
            body: {
                "firstname": "Weslley Alterado",
                "lastname": "Nogueira",
                "totalprice": 9000,
                "depositpaid": true,
                "bookingdates":
                {
                    "checkin": "2026-01-01",
                    "checkout": "2026-01-09"
                },
                "additionalneeds": "Teste"
            }, headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': 'token=123456'

            }
        })


    })
})
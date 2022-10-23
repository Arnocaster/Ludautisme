const ApiError = require('../../errors/apiError');
const {
    bookingDataMapper, permanencyDataMapper, articleDataMapper, usersDataMapper, incidentDataMapper,
} = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        res.json('TestGetAll');
    },
    async addOne(req, res) {
        res.json('TestAddOne');
    },
    async getOne(req, res) {
        res.json('TestRemoveOne');
    },
    async removeOne(req, res) {
        res.json('TestRemoveOne');
    },
    async updateOne(req, res) {
        res.json('TestUpdateOne');
    },
    async addAnswer(req, res) {
        res.json('addAnswer');
    },
};

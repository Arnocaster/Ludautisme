/* eslint-disable no-tabs */
/* eslint-disable quotes */
/* eslint-disable consistent-return */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} incident
 * @property {number}  id - Unique identifier
 * @property {number} id_user_declaration - User got games
 * @property {number} id_user_resolution - User had given back games
 * @property {number}  id_ref - member unique id
 * @property {number}  id_booking - member card number
 * @property {string}  texte_declaration - member email
 * @property {string}  date_declaration - User first name
 * @property {string}  texte_resolution - User last name
 * @property {string}  date_resolution - Permanency number for the booking
 * @property {boolean}  closed - Permanency's booking
 */

/**
 * @typedef {object} IncidentParam
 * @property {number} articleNumber - Number of concerned article
 */

module.exports = {
    async findAll() {
        const query = `SELECT 
                        i.id,
                       FROM incident;`;
        const result = await sqlHandler(query);
        return result.rows;
    },
    async findFiltered(arr) {
        let query = ``;
        const placeholders = [];
        arr.forEach((filter, index) => {
            const prop = Object.keys(filter)[0];
            placeholders.push(filter[prop]);
            if (index !== arr.length - 1) {
                query += `"${prop}"=$${index + 1} AND `;
            } else {
                query += `"${prop}"=$${index + 1} `;
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async findOne(id) {
        const query = ``;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async addOne(obj) {
        const props = Object.keys(obj);
        const query = `INSERT INTO "incident" (`;
        const placeHolders = '';
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async addAnswer() {
        const props = Object.keys(obj);
        const query = `INSERT INTO "incident" (`;
        const placeHolders = '';
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async close(id) {
        const result = await sqlHandler(`
        UPDATE "booking"
        SET "closed"='true',
            "delivered"='true'
        WHERE "id"=$1
        RETURNING *
        `, [id]);
        return result.rows;
    },
};

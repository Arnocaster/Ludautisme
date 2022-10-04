/* eslint-disable quotes */
const sqlHandler = require('../../helpers/sqlHandler');

/**
 * @typedef {object} Tag
 * @property {number} id - Unique identifier
 * @property {string} name - Name of tag
 * @property {string} description - Description of tag
 * @property {boolean} main - If tag is main or secondary
 */
/**
 * @typedef {object} ParamCreateCat
 * @property {string} name.required - Name of tag
 * @property {string} description - Description of tag
 * @property {boolean} main - If tag is main or secondary
 */
module.exports = {
    async getAll() {
        const result = await sqlHandler('SELECT * FROM "tag"');
        return result.rows;
    },
    async findFiltered(arr) {
        let query = `SELECT * FROM "tag"
        WHERE `;
        const placeholders = [];
        arr.forEach((filter, index) => {
            const prop = Object.keys(filter)[0];
            placeholders.push(filter[prop]);
            if (index !== arr.length - 1) {
                query += `${prop}=$${index + 1} AND `;
            } else {
                query += `${prop}=$${index + 1}`;
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows;
    },
    async create(obj) {
        const props = Object.keys(obj);
        let query = `INSERT INTO "tag" (`;
        let columns = ``;
        let values = ``;
        const placeholders = [];
        props.forEach((prop, index) => {
            if (index !== props.length - 1) {
                columns += `${prop}, `;
                values += `$${index + 1}, `;
            } else {
                columns += `${prop}) VALUES (`;
                values += `$${index + 1}) RETURNING *`;
            }
            placeholders.push(obj[prop]);
        });
        query += columns + values;
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async update(id, obj) {
        const props = Object.keys(obj);
        let query = `UPDATE "tag" SET `;
        const placeholders = [];
        props.forEach((prop, index) => {
            placeholders.push(obj[prop]);
            if (index !== props.length - 1) {
                query += `${prop}=$${index + 1}, `;
            } else {
                query += `${prop}=$${index + 1} WHERE id=$${index + 2} RETURNING *`;
                placeholders.push(id);
            }
        });
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
    async delete(id) {
        const query = `DELETE FROM "tag" WHERE id=$1 RETURNING *`;
        const placeholders = [id];
        const result = await sqlHandler(query, placeholders);
        return result.rows[0];
    },
};

const express = require('express');
const ApiError = require('../../../errors/apiError');
const { tagController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST api/admin/categorie/search
 * @summary Get Tag filtered
 * @tags [ADMIN] Tag
 * @param {Tag} request.body.required At least one of these
 * @return {array<Tag>} 200 - succes response - application/json
 */
router.route('/search')
    .post(controllerHandler(tagController.findFiltered));
/**
 * PUT api/admin/categorie/:id
 * @summary Update one Tag
 * @tags [ADMIN] Tag
 * @param {number} request.params.id.required - Id of Tag
 * @param {ParamCreateCat} request.body.required - At least one of these
 * @return {Tag} 200 - succes response - application/json
 */
/**
 * DELETE api/admin/categorie/:id
 * @summary Delete on Tag
 * @tags [ADMIN] Tag
 * @param {number} request.params.requires - Id of Tag
 * @return {Tag} 200 - succes response - application/json
 */
router.route('/:id')
    .put(controllerHandler(tagController.update))
    .delete(controllerHandler(tagController.delete));
/**
 * GET api/admin/categorie
 * @summary Get all Tag
 * @tags [ADMIN] Tag
 * @return {array<Tag>} 200 - succes response - application/json
 */
/**
 * POST api/admin/categorie
 * @summary Add new Tag
 * @tags [ADMIN] Tag
 * @param {ParamCreateCat} request.body.required - At least name
 * @return {Tag} 200 - succes response - application/json
 */
router.route('/')
    .get(controllerHandler(tagController.getAll))
    .post(controllerHandler(tagController.addTag));
router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;

const express = require('express');
const ApiError = require('../../../errors/apiError');
const { referenceController, articleController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * POST api/admin/references/article
 * @summary Add one article to reference
 * @tags [ADMIN] Reference
 * @param {ParamArticleCreate} request.body.required At least number and id_ref
 * @return {Article} 201 - success response - application/json
 */
router.route('/article')
    .post(controllerHandler(articleController.addArticle));
/**
 * GET api/admin/references/article
 * @summary Get all active references for admin
 * @tags [ADMIN] Reference
 * @return {[Reference]} 200 - success response - application/json
 */
router.route('/active')
    .get(controllerHandler(referenceController.getActive));
/**
 * GET api/admin/references/:id
 * @summary Get one reference with this articles
 * @tags [ADMIN] Reference
 * @return {allOf|Reference|Pictures|Articles} 200 - success response - application/json
 */
/**
 * PUT api/admin/references/:id
 * @summary Update on reference
 * @tags [ADMIN] Reference
 * @param {number} request.params.id.required - Id of the reference to update
 * @param {paramRefCreate} request.body.required - At least one of these
 * @returns {RefUpdate} 201 - succes response - application/json
 */
router.route('/:id')
    .get(controllerHandler(referenceController.getOne))
    .put(controllerHandler(referenceController.update));
/**
 * GET api/admin/references
 * @summary Get all references for admin
 * @tags [ADMIN] Reference
 * @return {[Reference]} 200 - success response - application/json
 */
/**
 * POST api/admin/references
 * @summary Create a new reference
 * @tags [ADMIN] Reference
 * @param {paramRefCreate} request.body.required - At least name
 * @return {Reference} 201 - succes response - application/json
 */
router.route('/')
    .get(controllerHandler(referenceController.getAll))
    .post(controllerHandler(referenceController.addRef));
router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;

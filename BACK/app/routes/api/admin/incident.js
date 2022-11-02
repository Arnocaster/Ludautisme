const express = require('express');
const ApiError = require('../../../errors/apiError');
const { incidentController } = require('../../../controllers/admin');
const controllerHandler = require('../../../helpers/apiControllerHandler');

const router = express.Router();

/**
 * GET /api/admin/incident/:id
 * @summary Get a single incident
 * @tags [ADMIN] Incident
 * @param {number} request.params.required - At least one of these params
 * @return {incident} 200 - success response - application/json
 */

/**
 * PUT /api/admin/incident/:id
 * @summary Add a reference to a incident
 * @tags [ADMIN] Incident
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {incident} 200 - success response - application/json
 */

/**
 * DELETE /api/admin/incident/:id
 * @summary Delete a incident
 * @tags [ADMIN] Incident
 * @param {paramSearch} request.body.required - At least one of these params
 * @return {incident} 200 - success response - application/json
 */

router.route('/:id')
    .get(controllerHandler(incidentController.getOne))
    .put(controllerHandler(incidentController.updateOne))
    .delete(controllerHandler(incidentController.removeOne));

/**
 * GET /api/admin/incident/
 * @summary Get all incidents
 * @tags [ADMIN] Incident
 * @return {incident} 200 - success response - application/json
 */

/**
 * POST /api/admin/incident/
 * @summary Add a new incident
 * @tags [ADMIN] Incident
 * @param {paramIndident}
 * @return {Confirm} 200 - success response - applcation/json
 */

router.route('/')
    .get(controllerHandler(incidentController.getAll))
    .post(controllerHandler(incidentController.addOne));

router.use(() => {
    throw new ApiError(404, 'API Route not found');
});
module.exports = router;

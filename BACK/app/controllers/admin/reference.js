const ApiError = require('../../errors/apiError');
const { referenceDataMapper, pictureDataMapper, categoryDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        const results = await referenceDataMapper.findAll();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getActive(req, res) {
        const results = await referenceDataMapper.findActive();
        if (!results) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async getOne(req, res) {
        const results = await referenceDataMapper.findOne(req.params.id);
        if (!results[0]) {
            throw new ApiError(404, 'Aucun résultat trouvé');
        }
        return res.json(results);
    },
    async addRef(req, res) {
        const reference = await referenceDataMapper.findByName(req.body.name);
        if (reference.length > 0) {
            throw new ApiError(400, 'Une référence avec le même nom existe déjà');
        }
        const newRef = await referenceDataMapper.create(req.body);
        if (!newRef) {
            throw new ApiError(500, 'Impossible de créer la référence');
        }
        if (!req.body.picture) {
            req.body.picture = 6;
        }
        const picture = await pictureDataMapper.addRelation(newRef.id, req.body.picture);
        if (picture[0]) {
            throw new ApiError(500, 'Impossible d\'ajouter l\'image');
        }
        return res.json(newRef);
    },
    async update(req, res) {
        const reference = await referenceDataMapper.findOne(req.params.id);

        if (reference.length < 1) {
            throw new ApiError(404, 'Cette référence n\'existe pas');
        }

        const newRef = req.body;

        // Get and update update referencetotag
        const oldTagsIds = (Array.isArray(reference.tag))
                                && reference.tag.map((tagObj) => tagObj.id);
        const newTagsIds = (Array.isArray(newRef.tag))
                                && newRef.tag.map((tagObj) => tagObj.id);

        // Get new and removed tags.
        const addedTags = (newTagsIds && oldTagsIds)
            && newTagsIds.filter((id) => !oldTagsIds.includes(id));
        const removedTags = (newTagsIds && oldTagsIds)
            && oldTagsIds.filter((id) => !newTagsIds.includes(id));

        console.log('!!!LES TAGS', addedTags, removedTags);

        // Remove tags  (doesn't belong to reference entity)
        delete newRef.tag;

        const updateRef = await referenceDataMapper.update(req.params.id, newRef);
        const updatedRef = await referenceDataMapper.findOne(req.params.id);
        return res.json(updatedRef[0]);
    },
};

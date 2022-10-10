const ApiError = require('../../errors/apiError');

const { tagDataMapper, referenceDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        const results = await tagDataMapper.getAll();
        return res.json(results);
    },
    async addTag(req, res) {
        const arr = [{ name: req.body.name }];
        const tag = await tagDataMapper.findFiltered(arr);
        if (tag.length > 0) {
            throw new ApiError(400, 'Un tag avec le même nom existe déjà');
        }
        const newTag = await tagDataMapper.create(req.body);
        return res.json(newTag);
    },
    async findFiltered(req, res) {
        const columns = ['id', 'name'];
        const obj = req.body;
        const props = Object.keys(obj);
        const arr = [];
        props.forEach((prop) => {
            const value = obj[prop];
            const index = columns.indexOf(prop);
            if (Number.isNaN(index)) {
                throw new ApiError(400, 'Impossible de chercher par cette propriété (non reconnue ou non implémentée)');
            }
            if (['id'].includes(columns[index]) && typeof value !== 'number') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
            }
            arr.push({ [columns[index]]: value });
        });
        const tag = await tagDataMapper.findFiltered(arr);
        if (tag.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }
        return res.json(Tag);
    },
    async update(req, res) {
        const id = [{ id: req.params.id }];
        const tag = await tagDataMapper.findFiltered(id);
        if (tag.length < 1) {
            throw new ApiError(404, 'Ce tag n\'existe pas');
        }
        const updatedTag = await tagDataMapper.update(req.params.id, req.body);
        return res.json(updatedTag);
    },
    async delete(req, res) {
        const deletedTag = await tagDataMapper.delete(req.params.id);
        if (!deletedTag) {
            throw new ApiError(404, 'Le tag n\'a pas été trouvé, rien n\'a été supprimé');
        }
        return res.json(deletedTag);
    },
    async addTagToReference(req, res) {
        const { idRef } = req.params;
        const idTag = req.body.tag;
        if (Number.isNaN(Number(idRef)) || Number.isNaN(Number(idRef))) {
            throw new ApiError(404, 'Paramètres envoyés invalides');
        }

        const tag = await tagDataMapper.findFiltered([{ id: idTag }]);
        if (tag.length < 1) {
            throw new ApiError(404, 'Ce tag n\'existe pas');
        }

        const reference = await referenceDataMapper.findOne(idRef);
        if (reference.length < 1) {
            throw new ApiError(404, 'Cette référence n\'existe pas');
        }

        const newLink = tagDataMapper.addTagToReference(idRef, idTag);
        return res.json(newLink);
    },
    async removeTagToReference(req, res) {
        const { idRef } = req.params;
        const idTag = req.body.tag;
        if (Number.isNaN(Number(idRef)) || Number.isNaN(Number(idRef))) {
            throw new ApiError(404, 'Paramètres envoyés invalides');
        }

        const refToTag = await tagDataMapper.getTagToReference(idRef, idTag);

        if (refToTag.length < 1) {
            throw new ApiError(404, 'Ce lien entre tag et référence n\'existe pas');
        }

        const removed = tagDataMapper.removeTagFromReference(idRef, idTag);
        return res.json(removed);
    },

};

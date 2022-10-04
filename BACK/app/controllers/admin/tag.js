const ApiError = require('../../errors/apiError');

const { tagDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(req, res) {
        const results = await tagDataMapper.getAll();
        return res.json(results);
    },
    async addCategorie(req, res) {
        const arr = [{ name: req.body.name }];
        const tag = await tagDataMapper.findFiltered(arr);
        if (tag.length > 0) {
            throw new ApiError(400, 'Une catégorie avec le même nom existe déjà');
        }
        const newTag = await tagDataMapper.create(req.body);
        return res.json(newTag);
    },
    async findFiltered(req, res) {
        const columns = ['id', 'name', 'description'];
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
        const user = await tagDataMapper.findFiltered(id);
        if (user.length < 1) {
            throw new ApiError(404, 'Cette catégorie n\'existe pas');
        }
        const updatedTag = await tagDataMapper.update(req.params.id, req.body);
        return res.json(updatedTag);
    },
    async delete(req, res) {
        const deletedTag = await tagDataMapper.delete(req.params.id);
        if (!deletedTag) {
            throw new ApiError(404, 'La catégorie n\'a pas été trouvé, rien n\'a été supprimé');
        }
        return res.json(deletedTag);
    },

};

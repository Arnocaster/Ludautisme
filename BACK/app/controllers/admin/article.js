const ApiError = require('../../errors/apiError');
const { articleDataMapper, referenceDataMapper } = require('../../models/admin');

module.exports = {
    async getAll(_, res) {
        const articles = await articleDataMapper.findAll();
        res.json(articles);
    },
    async getOne(req, res) {
        const idArticle = Number(req.params.id);
        const article = await articleDataMapper.findOne(idArticle);
        return res.json(article);
    },
    async getFiltered(req, res) {
        const columns = [
            'id', 'number', 'origin', 'date_buy', 'available', 'archived',
            'id_booking', 'id_ref', 'ref_name', 'cat_id', 'cat_name'];
        const obj = req.body;
        const props = Object.keys(obj);
        const arr = [];
        props.forEach((prop) => {
            const value = obj[prop];
            const index = columns.indexOf(prop);
            if (Number.isNaN(index)) {
                throw new ApiError(400, `Impossible de chercher par cette propriété : ${prop} (non reconnue ou non implémentée)`);
            }
            if (['id', 'number', 'id_booking', 'id_ref', 'cat_id'].includes(columns[index]) && Number.isNaN(value)) {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : nombre)');
            }
            if (['archived', 'available'].includes(columns[index]) && typeof value !== 'boolean') {
                throw new ApiError(400, 'La valeur recherchée n\'est pas du type attendu (attendu : booléen)');
            }
            arr.push({ [columns[index]]: value });
        });
        const articles = await articleDataMapper.findFiltered(arr);
        if (articles.length < 1) {
            throw new ApiError(400, 'Nous n\'avons rien trouvé avec ces critères');
        }
        return res.json(articles);
    },
    async addArticle(req, res) {
        // je vérifie si la référence existe
        const reference = await referenceDataMapper.findOne(req.body.id_ref);
        if (reference.length < 1) {
            throw new ApiError(404, 'La référence parent n\'existe pas');
        }
        const article = await articleDataMapper.findByCode(req.body.number);
        if (article.length > 0) {
            throw new ApiError(400, 'Un article avec le même numéro existe déjà');
        }
        const newArticle = await articleDataMapper.create(req.body);

        return res.json(newArticle);
    },
    async updateArticle(req, res) {
        const id = [{ id: req.params.id }];
        const article = await articleDataMapper.findFiltered(id);
        if (article.length < 1) {
            throw new ApiError(404, 'Cet article n\'existe pas');
        }
        const number = [{ number: req.body.number }];
        const sameNumberArticle = await articleDataMapper.findFiltered(number);
        if (sameNumberArticle.length > 0 && sameNumberArticle[0].id !== Number(req.params.id)) {
            throw new ApiError(404, 'Ce numéro est déjà utilisé');
        }
        const updatedUser = await articleDataMapper.update(req.params.id, req.body);
        return res.json(updatedUser);
    },
};

var mongoose = require('mongoose');
var config = require('../../config');
var api = require('../../models/api');
var qiwi = require('../../libs/qiwi');
mongoose.connect(config.mongo_host, {useNewUrlParser: true, useUnifiedTopology: true});

async function getNewCardForm(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let resp = await qiwi.getToken(auth_user.id, 'EXECUTOR');

        response({
            status: "OK",
            error: null,
            data: resp
        });
    });
}

async function updateCard(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let id = data._id;
        delete data._id;

        let card = await api.Card.findOne({
            _id: id,
            user_id: auth_user.id,
            user_type: 'EXECUTOR'
        });

        if(!card)
            response({
                status: "ERROR",
                error: 'NO_SUCH_CARD',
                data:null
            });

        for (let key in data) {
            card[key] = data[key];
        }

        await card.save();

        let profile = await api.Executor.findById(auth_user.id);
        if(!profile.active_card_id || profile.active_card_id !== card._id){
            profile.active_card_id = card._id;
        }
        await profile.save();

        response({
            status: "OK",
            error: null,
            data: card
        });
    });
}

async function deleteCard(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        if(!data._id || data._id.length !== 24)
            return response({
                status: "ERROR",
                error: 'MISSING_INPUT_PARAMETERS',
                data:null
            });

        let card = api.Card.findOne({
            _id: mongoose.Types.ObjectId(data._id),
            user_id: auth_user.id,
            user_type: 'EXECUTOR'
        });

        if(!card)
            return response({
                status: "ERROR",
                error: 'NO_SUCH_CARD',
                data:null
            });

        await api.Card.deleteOne({ _id: data._id });

        let profile = await api.Executor.findById(auth_user.id);
        if(profile.active_card_id = data._id){
            profile.active_card_id = null;
        }
        await profile.save();

        return response({
            status: "OK",
            error: null,
            data: {}
        });
    });
}

async function getMyCards(data) {
    let {auth_user} = data;

    return new Promise(async (response, reject) => {
        let cards = await api.Card.find({
            user_id: auth_user.id,
            user_type:"EXECUTOR",
            active: true
        });

        response({
            status: "OK",
            error: null,
            data: cards
        });
    });
}

var exports = module.exports = {};
exports.updateCard = updateCard;
exports.deleteCard = deleteCard;
exports.getMyCards = getMyCards;
exports.getNewCardForm = getNewCardForm;

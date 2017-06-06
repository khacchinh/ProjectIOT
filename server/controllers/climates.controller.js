var config = require('config.json');
var express = require('express');
var router = express.Router();
var climateServices = require('services/climate.service');

// routes
router.get('/server_name/:_server', getAll);
router.get('/current/:_id', getCurrent);
router.put('/:_id', update);
//router.delete('/:_id', _delete);

module.exports = router;



function getAll(req, res) {
    climateServices.getAll(req.params.server)
        .then(function (climates) {
            res.send(climates);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    climateServices.getById(req.params._id)
        .then(function (climate) {
            if (climate) {
                res.send(climate);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    climateServices.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*
function _delete(req, res) {
    climateServices.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function authenticate(req, res) {
    climateServices.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(401).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function register(req, res) {
    climateServices.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
*/
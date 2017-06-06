var config = require('config.json');
var express = require('express');
var router = express.Router();
var irrigationServices = require('services/irrigation.service');

// routes
router.get('/server_name/:_server', getAll);
router.get('/current/:_id', getCurrent);
router.put('/:_id', update);
//router.delete('/:_id', _delete);

module.exports = router;



function getAll(req, res) {
    irrigationServices.getAll(req.params.server)
        .then(function (irrigations) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    irrigationServices.getById(req.params._id)
        .then(function (irrigation) {
            if (irrigation) {
                res.send(irrigation);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    irrigationServices.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

/*
function _delete(req, res) {
    irrigationServices.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function authenticate(req, res) {
    irrigationServices.authenticate(req.body.username, req.body.password)
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
    irrigationServices.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
*/
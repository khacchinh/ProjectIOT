var config = require('config.json');
var express = require('express');
var router = express.Router();
var irrigationServices = require('services/irrigation.service');

// routes
router.get('/server_name/:server', getAll);
router.get('/current/:_id', getCurrent);
router.get('/push/:_data', update);
router.get('/data_charts/:server', getDataIrrigationChart);
router.post('/create', addServer);
router.delete('/:server', _delete);
router.put('/:server', updateServer);

module.exports = router;



function getAll(req, res) {
    irrigationServices.getAll(req.params.server)
        .then(function (irrigations) {
            res.send(irrigations);
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
    var data = req.params._data;
    var arr_data = data.split("-");
    // var irrigationData = {
    //     "key" : arr_data[1],
    //     "value" : (!isNaN(arr_data[2])) ? parseFloat(arr_data[2]) : arr_data[2]
    // }
    var irrigationData = {
        "server": arr_data[0],
        "irr_view_ph" : arr_data[1],
        "irr_view_ec" : arr_data[2],
        "irr_view_waterTemp" : arr_data[3],
        "irr_view_OxygenConc" : arr_data[4],
        "irr_stt_nutrition" : arr_data[5],
        "irr_stt_cliller" : arr_data[6],
        "irr_alarm" : arr_data[7],
    }
    irrigationServices.update(irrigationData)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getDataIrrigationChart(req, res){
    irrigationServices.getDataIrrigationChart(req.params.server)
        .then(function(datas){
            res.send(datas)
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

function addServer(req, res) {
    irrigationServices.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    irrigationServices.delete(req.params.server)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateServer(req, res) {
    irrigationServices.updateServer(req.params.server, req.body)
        .then(function (irrigation) {
            res.send(irrigation);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
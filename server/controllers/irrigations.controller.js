var config = require('config.json');
var express = require('express');
var router = express.Router();
var irrigationServices = require('services/irrigation.service');

// routes
router.get('/server_name/:server', getAll);
router.get('/current/:_id', getCurrent);
router.get('/push/:_data', update);
router.get('/data_charts/:server', getDataIrrigationChart);

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
    var irrigationData = {
        "key" : arr_data[1],
        "value" : (!isNaN(arr_data[2])) ? parseFloat(arr_data[2]) : arr_data[2]
    }
    irrigationServices.update(arr_data[0], irrigationData)
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
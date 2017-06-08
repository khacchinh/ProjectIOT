var config = require('config.json');
var express = require('express');
var router = express.Router();
var climateServices = require('services/climate.service');

// routes
router.get('/server_name/:server', getAll);
router.get('/current/:_id', getCurrent);
router.get('/servers', getAllServerName);
router.get('/push/:_data', update);
router.get('/data_charts/:server', getDataClimateChart);

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
    var data = req.params._data;
    var arr_data = data.split("-");
    var climateData = {
        "key" : arr_data[1],
        "value" : (!isNaN(arr_data[2])) ? parseFloat(arr_data[2]) : arr_data[2]
    }
    climateServices.update(arr_data[0], climateData)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAllServerName(req, res){
    climateServices.getAllServerName()
        .then(function(climates){
            res.send(climates)
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}

function getDataClimateChart(req, res){
    climateServices.getDataClimateChart(req.params.server)
        .then(function(datas){
            res.send(datas)
        })
        .catch(function(err){
            res.status(400).send(err);
        });
}
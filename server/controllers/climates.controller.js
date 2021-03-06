﻿var config = require('config.json');
var express = require('express');
var router = express.Router();
var climateServices = require('services/climate.service');

// routes
router.get('/server_name/:server', getAll);
router.get('/current/:_id', getCurrent);
router.get('/servers', getAllServerName);
router.get('/push/:_data', update);
router.get('/data_charts/:server', getDataClimateChart);
router.post('/create', addServer);
router.delete('/:server', _delete);
router.put('/:server', updateServer);

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
    // var climateData = {
    //     "key" : arr_data[1],
    //     "value" : (!isNaN(arr_data[2])) ? parseFloat(arr_data[2]) : arr_data[2]
    // }
    var climateData = {
        "server": arr_data[0],
        "cli_view_temp" : arr_data[1],
        "cli_view_humi" : arr_data[2],
        "cli_view_light" : arr_data[3],
        "cli_view_co2" : arr_data[4],
        "cli_stt_fan" : arr_data[5],
        "cli_stt_cooling" : arr_data[6],
        "cli_stt_nozzle" : arr_data[7],
        "cli_stt_shadingNet" : arr_data[8],
        "cli_stt_ventDoor" : arr_data[9],
    }
    climateServices.update(climateData)
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

function addServer(req, res) {
    climateServices.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    climateServices.delete(req.params.server)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateServer(req, res) {
    climateServices.updateServer(req.params.server, req.body)
        .then(function (climate) {
            res.send(climate);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
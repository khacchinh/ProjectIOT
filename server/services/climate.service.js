var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var fs = require('fs');
var path = require('path');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('climates');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.getDataClimateChart = getDataClimateChart;
service.create = create;
service.update = update;
service.getAllServerName  = getAllServerName;
service.delete = _delete;
service.updateServer = updateServer;

module.exports = service;

function getAll(server) {
    var deferred = Q.defer();
    db.climates.find({"server" : server}).toArray(function (err, climates) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(climates);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.climates.findById(_id, function (err, climate) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (climate) {
            // return user (without hashed password)
            deferred.resolve(climate);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function update(climateParam) {
    var deferred = Q.defer();

    // validation
    db.climates.findOne({ server: climateParam.server },function (err, climate) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (climate) {
            climate.cli_view_temp = climateParam.cli_view_temp;
            climate.cli_view_humi = climateParam.cli_view_humi;
            climate.cli_view_light = climateParam.cli_view_light;
            climate.cli_view_co2 = climateParam.cli_view_co2;
            climate.cli_stt_fan = climateParam.cli_stt_fan;
            climate.cli_stt_cooling = climateParam.cli_stt_cooling;
            climate.cli_stt_nozzle = climateParam.cli_stt_nozzle;
            climate.cli_stt_shadingNet = climateParam.cli_stt_shadingNet;
            climate.cli_stt_ventDoor = climateParam.cli_stt_ventDoor;
            updateClimate(climate);
        } else {
            deferred.reject('Server name "' + climateParam.server + '" is not exist');
        }
    });

    function updateClimate(arrClimate) {
        // fields to update
        db.climates.update(
            { _id: mongo.helper.toObjectID(arrClimate._id) },
            { $set: arrClimate },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                var txtClimate = '';
                var date = new Date();
                for(var key in arrClimate) {
                    txtClimate += arrClimate[key] + ",";
                }
                txtClimate += date.valueOf().toString() + "\n";
                fs.appendFileSync(path.join(__dirname + '/data/climate/'+ arrClimate.server +'.txt'), txtClimate); 
                var socketIO = global.socketIO;
			    socketIO.sockets.emit('climate_update', arrClimate);
                deferred.resolve();
        });
    }
    return deferred.promise;
}

function getAllServerName(){
     var deferred = Q.defer();
     db.climates.find({}, {server : 1}).toArray(function (err, climates) {
         if (err) deferred.reject(err.name + ': ' + err.message);
         deferred.resolve(climates);
     });
     return deferred.promise;
 }

function getDataClimateChart(server){
    var deferred = Q.defer();
    fs.readFile(path.join(__dirname + '/data/climate/'+ server +'.txt'),'utf8', function(err, data) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        var arr_data = data.split("\n");
        var cli_view_temp = [];
        var cli_view_humi = [];
        var cli_view_light = [];
        var cli_view_co2 = [];

        arr_data.forEach(function(element) {
            if (element.length > 0){
                var arr_element = element.split(",");
                cli_view_temp.push(dataTemp(arr_element[11], arr_element[2]));
                cli_view_humi.push(dataTemp(arr_element[11], arr_element[3]));
                cli_view_light.push(dataTemp(arr_element[11], arr_element[4]));
                cli_view_co2.push(dataTemp(arr_element[11], arr_element[5]));
            }
        }, this);
        var object_data = {
            "cli_view_temp": cli_view_temp,
            "cli_view_humi": cli_view_humi,
            "cli_view_light": cli_view_light,
            "cli_view_co2" : cli_view_co2
        };
        deferred.resolve(object_data);
    });
    return deferred.promise;
}

function dataTemp(date, value){
    var data_temp = [];
    data_temp.push(parseFloat(date));
    data_temp.push(parseFloat(value));
    return data_temp;
}

function _delete(server) {
    var deferred = Q.defer();

    db.climates.remove(
        { server: server },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function create(climateParam) {
    var deferred = Q.defer();

    // validation
    db.climates.findOne(
        { server: climateParam.server },
        function (err, climate) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (climate) {
                deferred.reject('Server name "' + climateParam.server + '" is already taken');
            } else {
                createClimate();
            }
        });

    function createClimate() {
        var climate = {
            "server":climateParam.server
        }
        db.climates.insert(
            climate,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                fs.appendFileSync(path.join(__dirname + '/data/climate/'+ climateParam.server +'.txt'), ''); 
                deferred.resolve();
            });
    }
    return deferred.promise;
}


function updateServer(server, climateParam) {
    var deferred = Q.defer();

    // validation
    db.climates.findOne({ server: server },function (err, climate) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (climate) {
            climate.server = climateParam.server;
            updateClimate(climate);
        } else {
            deferred.reject('Server name "' + climateParam.server + '" is not exist');
        }
    });

    function updateClimate(arrClimate) {
        // fields to update
        db.climates.update(
            { _id: mongo.helper.toObjectID(arrClimate._id) },
            { $set: arrClimate },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                fs.renameSync(path.join(__dirname + '/data/climate/'+ server +'.txt'), path.join(__dirname + '/data/climate/'+ climateParam.server +'.txt'))
                deferred.resolve();
        });
    }
    return deferred.promise;
}
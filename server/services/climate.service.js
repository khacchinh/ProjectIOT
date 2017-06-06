var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('climates');

var service = {};

service.getAll = getAll;
service.getById = getById;
//service.create = create;
service.update = update;
//service.delete = _delete;

module.exports = service;

function getAll(server) {
    var deferred = Q.defer();
    db.climates.find({"server" : server}).toArray(function (err, climates) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        var socketIO = global.socketIO;
		socketIO.sockets.emit('message', "OK! success");
        deferred.resolve(climates);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.climates.findById(_id, function (err, climate) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(climate);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function update(_id, climateParam) {
    var deferred = Q.defer();

    // validation
    db.climates.findById(_id, function (err, climate) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (climate.servername !== climateParam.servername) {
            // username has changed so check if the new username is already taken
            db.climates.findOne(
                { servername: climateParam.servername },
                function (err, climate) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (climate) {
                        // username already exists
                        deferred.reject('Server name "' + req.body.servername + '" is already taken')
                    } else {
                        updateClimate();
                    }
                });
        } else {
            updateClimate();
        }
    });

    function updateClimate() {
        // fields to update

        var set = {
            cli_view_temp: climateParam.cli_view_temp,
            cli_view_humi: climateParam.cli_view_humi,
            cli_view_light: climateParam.cli_view_light,
            cli_view_co2: climateParam.cli_view_co2,
            cli_stt_fan: climateParam.cli_stt_fan,
            cli_stt_cooling: climateParam.cli_stt_cooling,
            cli_stt_nozzle: climateParam.cli_stt_nozzle,
            cli_stt_shadingNet: climateParam.cli_stt_shadingNet,
            cli_stt_ventDoor: climateParam.cli_stt_ventDoor
        };
        db.climates.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                var socketIO = global.socketIO;
			    socketIO.sockets.emit('climate_update', set);
                deferred.resolve();
            });
    }

    return deferred.promise;
}
/*
function _delete(_id) {
    var deferred = Q.defer();

    db.climates.remove(
        { _id: mongo.helper.toObjectID(_id) },
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
        { servername: climateParam.servername },
        function (err, climate) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Server name "' + climateParam.servername + '" is already taken');
            } else {
                createClimate();
            }
        });

    function createClimate() {
        db.climates.insert(
            climate,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
*/
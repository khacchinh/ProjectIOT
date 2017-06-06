var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('irrigations');

var service = {};

service.getAll = getAll;
service.getById = getById;
//service.create = create;
service.update = update;
//service.delete = _delete;

module.exports = service;

function getAll(server) {
    var deferred = Q.defer();
    db.irrigations.find({"server" : server}).toArray(function (err, irrigations) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        deferred.resolve(irrigations);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.irrigations.findById(_id, function (err, irrigation) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(irrigation);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function update(_id, irrigationParam) {
    var deferred = Q.defer();

    // validation
    db.irrigations.findById(_id, function (err, irrigation) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (irrigation.servername !== irrigationParam.servername) {
            // username has changed so check if the new username is already taken
            db.irrigations.findOne(
                { servername: irrigationParam.servername },
                function (err, irrigation) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (irrigation) {
                        // username already exists
                        deferred.reject('Server name "' + req.body.servername + '" is already taken')
                    } else {
                        updateIrrigation();
                    }
                });
        } else {
            updateIrrigation();
        }
    });

    function updateIrrigation() {
        // fields to update

        var set = {
            cli_view_temp: irrigationParam.cli_view_temp,
            cli_view_humi: irrigationParam.cli_view_humi,
            cli_view_light: irrigationParam.cli_view_light,
            cli_view_co2: irrigationParam.cli_view_co2,
            cli_stt_fan: irrigationParam.cli_stt_fan,
            cli_stt_cooling: irrigationParam.cli_stt_cooling,
            cli_stt_nozzle: irrigationParam.cli_stt_nozzle,
            cli_stt_shadingNet: irrigationParam.cli_stt_shadingNet,
            cli_stt_ventDoor: irrigationParam.cli_stt_ventDoor
        };
        db.irrigations.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                var socketIO = global.socketIO;
			    socketIO.sockets.emit('irrigation_update', set);
                deferred.resolve();
            });
    }

    return deferred.promise;
}
/*
function _delete(_id) {
    var deferred = Q.defer();

    db.irrigations.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function create(irrigationParam) {
    var deferred = Q.defer();

    // validation
    db.irrigations.findOne(
        { servername: irrigationParam.servername },
        function (err, irrigation) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Server name "' + irrigationParam.servername + '" is already taken');
            } else {
                createIrrigation();
            }
        });

    function createIrrigation() {
        db.irrigations.insert(
            irrigation,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}
*/
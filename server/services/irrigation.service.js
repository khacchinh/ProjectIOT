var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var fs = require('fs');
var path = require('path');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('irrigations');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.getDataIrrigationChart = getDataIrrigationChart;
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

function update(_server, irrigationParam) {
    var deferred = Q.defer();

    // validation
    db.irrigations.findOne({ server: _server },function (err, irrigation) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (irrigation) {
            irrigation[irrigationParam.key] = irrigationParam.value;
            updateIrrigation(irrigation);
        } else {
            deferred.reject('Server name "' + _server + '" is not exist');
        }
    });

    function updateIrrigation(arrIrrigation) {
        // fields to update
        db.irrigations.update(
            { _id: mongo.helper.toObjectID(arrIrrigation._id) },
            { $set: arrIrrigation },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                var txtIrrigation = '';
                var date = new Date();
                for(var key in arrIrrigation) {
                    txtIrrigation += arrIrrigation[key] + ",";
                }
                txtIrrigation += date.valueOf() + "\n";
                fs.appendFileSync(path.join(__dirname + '/data/irrigation/'+ _server +'.txt'), txtIrrigation); 
                var socketIO = global.socketIO;
			    socketIO.sockets.emit('irrigation_update', arrIrrigation);
                deferred.resolve();
        });
    }
    return deferred.promise;
}


function getDataIrrigationChart(server){
    var deferred = Q.defer();
    fs.readFile(path.join(__dirname + '/data/irrigation/'+ server +'.txt'),'utf8', function(err, data) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        var arr_data = data.split("\n");
        var irr_view_ph = [];
        var irr_view_ec = [];
        var irr_view_waterTemp = [];
        var irr_view_OxygenConc = [];

        arr_data.forEach(function(element) {
            if (element.length > 0){
                var arr_element = element.split(",");
                irr_view_ph.push(dataTemp(arr_element[9], arr_element[2]));
                irr_view_ec.push(dataTemp(arr_element[9], arr_element[3]));
                irr_view_waterTemp.push(dataTemp(arr_element[9], arr_element[4]));
                irr_view_OxygenConc.push(dataTemp(arr_element[9], arr_element[5]));
            }
        }, this);
        var object_data = {
            "irr_view_ph": irr_view_ph,
            "irr_view_ec": irr_view_ec,
            "irr_view_waterTemp": irr_view_waterTemp,
            "irr_view_OxygenConc" : irr_view_OxygenConc
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
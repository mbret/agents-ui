/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var Promise = require('bluebird');
var async = require('async');

module.exports.bootstrap = function(cb) {

    async.waterfall([
        // company
        function(cb){
          var entries = [
            {
              name: 'company a'
            },
            {
              name: 'company b'
            }
          ];
          async.map(entries, function(company, cb){
            Company.create(company).exec(function(err, company){
              return cb(err, company);
            })
          }, function(err, results){
            return cb(err, results);
          });
        },
        // Disease
        function(companies, cb){
          var entries = [
            {
              name: 'Disease a',
              incubation: 10, // days
              virulence: 2
            },
          ];
          async.map(entries, function(entry, cb){
            Disease.create(entry).exec(function(err, object){
              return cb(err, object);
            })
          }, function(err, results){
            return cb(err, companies, results);
          });
        },
        // vaccine
        function(companies, diseases, cb){
          var entries = [
            {
              name  : 'vaccin a',
              expire  : '2015-10-02',
              price  : 10.58,
              treatenDisease  : diseases[0]
            },
          ];
          async.map(entries, function(entry, cb){
            Disease.create(entry).exec(function(err, object){
              return cb(err, object);
            })
          }, function(err, results){
            return cb(err, companies, diseases, results);
          });
        },
    ], function(err, results){
        return cb(err);
    });
};

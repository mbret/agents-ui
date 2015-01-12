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
        // Country
        function(cb){
            var entries = [
                { name: 'France' }, { name: 'Italy' },{ name: 'Senegal' },{ name: 'Japan' }
            ]
            async.map(entries, function(entry, cb){
                Country.create(entry).exec(function(err, object){
                    return cb(err, object);
                })
            }, function(err, results){
                return cb(err, results);
            });
        },
        // City
        function(countries, cb){
            var entries = [
                { name: 'Paris', country: countries[0] },
                { name: 'Roma', country: countries[1] },
                { name: 'Dakar', country: countries[2] },
                { name: 'Tokyo', country: countries[3] }
            ]
            async.map(entries, function(entry, cb){
                City.create(entry).exec(function(err, object){
                    return cb(err, object);
                })
            }, function(err, results){
                return cb(err, countries, results);
            });
        },
        // company
        function(countries, cities, cb){
          var entries = [
            { name: 'company a' },
            { name: 'company b' }
          ];
          async.map(entries, function(company, cb){
            Company.create(company).exec(function(err, company){
              return cb(err, company);
            })
          }, function(err, results){
            return cb(err, results);
          });
        },
        // Planes
        function(countries, cities, companies, cb){
          var entries = [
            { company: companies[0], capacity: 200 },
            { company: companies[0], capacity: 150 },
            { company: companies[1], capacity: 200 },
            { company: companies[1], capacity: 300 },
            { company: companies[1], capacity: 122 }
          ];
          async.map(entries, function(entry, cb){
            Plane.create(entry).exec(function(err, object){
              return cb(err, object);
            })
          }, function(err, results){
            return cb(err, countries, cities, companies, results);
          });
        },
        // flights
        function(countries, cities, companies, planes, cb){
            var entries = [
                {
                    company: companies[0],
                    plane: planes[0],
                    type: 'charter',
                    minGain: 10,
                    totalGain: 50,
                    pricePerLot: 25,
                    departureDatePlanned: new Date(),
                    departureDateReal: new Date(),
                    arrivalDate: Math.floor(Date.now() / 1000), // timestamp in second
                    arrivalCity: 10
                },
                {
                    company: companies[1],
                    plane: planes[3],
                    type: 'charter',
                    minGain: 10,
                    totalGain: 50,
                    pricePerLot: 25,
                    departureDatePlanned: new Date(),
                    departureDateReal: new Date(),
                    arrivalDate: Math.floor(Date.now() / 1000), // timestamp in second
                    arrivalCity: 10
                },
            ];
            async.map(entries, function(entry, cb){
                Flight.create(entry).exec(function(err, object){
                    return cb(err, object);
                })
            }, function(err, results){
                return cb(err, countries, cities, companies, planes, results);
            });
        },
        // Disease
        function(countries, cities, companies, planes, flights, cb){
          var entries = [
            { name: 'Disease a', incubation: 10, virulence: 2 },
          ];
          async.map(entries, function(entry, cb){
            Disease.create(entry).exec(function(err, object){
              return cb(err, object);
            })
          }, function(err, results){
            return cb(err, countries, cities, companies, results);
          });
        },
        // vaccine
        function(countries, cities, companies, diseases, cb){
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
            return cb(err, countries, cities, companies, diseases, results);
          });
        },
    ], function(err, results){
        return cb(err);
    });
};

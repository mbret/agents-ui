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
            return cb(err, countries, cities, results);
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
                    minProfit: 10,
                    totalProfit: 50,
                    pricePerLot: 25,
                    departureDatePlanned: Math.floor(new Date('2014-01-01 22:15:10') / 1000),
                    departureDateReal: Math.floor(Date.now() / 1000),
                    arrivalDate: Math.floor(Date.now() / 1000), // timestamp in second
                    arrivalCity: cities[0]
                },
                {
                    company: companies[1],
                    plane: planes[3],
                    type: 'charter',
                    minProfit: 10,
                    totalProfit: 50,
                    pricePerLot: 25,
                    departureDatePlanned: Math.floor(Date.now() / 1000),
                    departureDateReal: Math.floor(Date.now() / 1000),
                    arrivalDate: Math.floor(Date.now() / 1000), // timestamp in second
                    arrivalCity: cities[1]
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
            { name: 'Disease b', incubation: 10, virulence: 5 },
            { name: 'Disease c', incubation: 5, virulence: 1 },
            { name: 'Disease d', incubation: 20, virulence: 2 },
          ];
          async.map(entries, function(entry, cb){
            Disease.create(entry).exec(function(err, object){
              return cb(err, object);
            })
          }, function(err, results){
            return cb(err, countries, cities, companies, flights, results);
          });
        },
        // vaccine
        function(countries, cities, companies, flights, diseases, cb){
          var entries = [
            { name  : 'vaccin a', expire  : 10, price  : 10.58, treatenDisease  : diseases[0] },
            { name  : 'vaccin b', expire  : 50, price  : 25, treatenDisease  : diseases[1] },
            { name  : 'vaccin c', expire  : 350, price  : 9.80, treatenDisease  : diseases[2] },
          ];
          async.map(entries, function(entry, cb){
            Vaccine.create(entry).exec(function(err, object){
              return cb(err, object);
            });
          }, function(err, results){
            return cb(err, countries, cities, companies, flights, diseases, results);
          });
        },
        // Organizations
        function(countries, cities, companies, flights, diseases, vaccines, cb){
            var entries = [
                { name: 'Organization a', capital: 150000 },
                { name: 'Organization b', capital: 180000 },
                { name: 'Organization c', capital: 90000 }
            ];
            async.map(entries, function(company, cb){
                Organization.create(company).exec(function(err, company){
                    return cb(err, company);
                })
            }, function(err, results ){
                return cb(err, countries, cities, companies, flights, diseases, vaccines, results);
            });
        },
        // Flight bookings
        function(countries, cities, companies, flights, diseases, vaccines, organizations,  cb){
            var entries = [
                { organization: organizations[0], flight: flights[0], seats: 150 },
                { organization: organizations[1], flight: flights[0], seats: 10 },
                { organization: organizations[1], flight: flights[1], seats: 120 },
            ];
            async.map(entries, function(entry, cb){
                FlightBooking.create(entry).exec(function(err, object){
                    return cb(err, object);
                })
            }, function(err, res){
                var results = {
                    countries: countries,
                    cities: cities,
                    companies: companies,
                    flights: flights,
                    diseases: diseases,
                    vaccines: vaccines,
                    organizations: organizations,
                    flightBookings: res
                };
                return cb(err, results);
            });
        },
        // Sick
        function(results,  cb){
            var entries = [
                { lastName: 'Maxime', firstName: 'Bret', country: results.countries[0], infectedDay: new Date('2013-12-05').getTime(), vaccinatedDay: Math.floor(Date.now() / 1000) },
                { lastName: 'Brian', firstName: 'Dechoux', country: results.countries[1], infectedDay: new Date('2012-12-05').getTime(), vaccinatedDay: Math.floor(Date.now() / 1000) },
                { lastName: 'Gael', firstName: 'Hopp', country: results.countries[2], infectedDay: new Date('2014-01-05').getTime(), vaccinatedDay: null },
                { lastName: 'a', firstName: 'a', country: results.countries[2], infectedDay: new Date('2014-01-05').getTime(), vaccinatedDay: null },
                { lastName: 'b', firstName: 'b', country: results.countries[2], infectedDay: new Date('2014-01-05').getTime(), vaccinatedDay: null },
                { lastName: 'c', firstName: 'c', country: results.countries[2], infectedDay: new Date('2014-01-05').getTime(), vaccinatedDay: null },
                { lastName: 'd', firstName: 'c', country: results.countries[2], infectedDay: new Date('2014-01-05').getTime(), vaccinatedDay: null },
                { lastName: 'e', firstName: 'c', country: results.countries[3], infectedDay: new Date('2014-02-01').getTime(), vaccinatedDay: null },
                { lastName: 'f', firstName: 'c', country: results.countries[1], infectedDay: new Date('2014-03-10').getTime(), vaccinatedDay: null },
                { lastName: 'g', firstName: 'c', country: results.countries[0], infectedDay: new Date('2014-04-20').getTime(), vaccinatedDay: null },
                { lastName: 'h', firstName: 'Hopp', country: results.countries[3], infectedDay: new Date('2012-12-20').getTime(), vaccinatedDay: null },
                { lastName: 'i', firstName: 'Hopp', country: results.countries[2], infectedDay: new Date('2012-12-05').getTime(), vaccinatedDay: null },
            ];
            async.map(entries, function(entry, cb){
                Sick.create(entry).exec(function(err, object){
                    return cb(err, object);
                });
            }, function(err, res){
                results.sick = res;
                return cb(err, results);
            });
        },
        // Laboratory
        function(results, cb){
            var entries = [
                { name: 'Grand laboratory a', type: 'grand' },
                { name: 'Grand laboratory b', type: 'grand' },
                { name: 'Generic laboratory a', type: 'generic' },
            ];
            async.map(entries, function(entry, cb){
                Laboratory.create(entry).exec(function(err, object){
                    switch(entry.type){
                        case 'generic':
                            GenericLaboratory.create({id: object.id}).exec(function(err, objec2){
                                return cb(err, object);
                            });
                            break;
                        default:
                            GrandGroupLaboratory.create({id: object.id}).exec(function(err, objec2){
                                return cb(err, object);
                            })
                            break;
                    }
                });
            }, function(err, res){
                results.laboratories = res;
                return cb(err, results);
            });
        },
        // Stocks
        function(results, cb){
            var entries = [
                { laboratory: results.laboratories[0], vaccine: results.vaccines[0], createdAt: Math.floor(Date.now() / 1000), number: 53, unitPrice: 10.56 },
                { laboratory: results.laboratories[1], vaccine: results.vaccines[1], createdAt: Math.floor(Date.now() / 1000), number: 360, unitPrice: 1 },
                { laboratory: results.laboratories[2], vaccine: results.vaccines[1], createdAt: Math.floor(Date.now() / 1000), number: 100, unitPrice: 6 },
                { laboratory: results.laboratories[2], vaccine: results.vaccines[0], createdAt: Math.floor(Date.now() / 1000), number: 2, unitPrice: 5.9 },
                { laboratory: results.laboratories[1], vaccine: results.vaccines[2], createdAt: Math.floor(Date.now() / 1000), number: 45, unitPrice: 7.03 },
                { laboratory: results.laboratories[1], vaccine: results.vaccines[0], createdAt: Math.floor(Date.now() / 1000), number: 78, unitPrice: 10 },
            ];
            async.map(entries, function(entry, cb){
                VaccineStock.create(entry).exec(function(err, object){
                    return cb(err, object);
                });
            }, function(err, results){
                results.stocks = results;
                return cb(err, results);
            });
        }

    ], function(err, results){
        return cb(err);
    });
};

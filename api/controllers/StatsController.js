var Promise = require('bluebird');
var moment = require('moment');
/**
 * Index Controller
 *
 */
var RestController = {

    getInfectionEvolution: function(req, res){

        var infections = {}; // contain
        var obj = {};

        // Get all sick
        Sick.find().then(function( entries ){
                obj = entries;
            var dataForChart = [];
            // Loop over period of 1 year until now
            //var yearBefore = moment().subtract(365, 'days');

            _.each(entries, function(entry){
                console.log(entry.infectedDay);
                var date = moment.unix(entry.infectedDay);
                incrementeInfection(date.month(), date.year());
            });
            return res.ok({
                data: convertObjectToArray(infections)
            })
        })
        // Catch error
        .catch(function(err){
            return res.serverError(err);
        });

        function incrementeInfection(month, year){
              var found = false;
              _.each(infections, function(value, key){
                  console.log(value, key);
                  if(key == month + '/' + year){
                      found = true;
                      infections[key]++;
                  }
              });
              if(!found){
                  infections[month + '/' + year] = 1;
              }
        }

        function convertObjectToArray( obj ){
            var ar = [];
            _.each(infections, function(value, key){
                ar.push( [key, value] );
            });
            return ar;
        }
    },

    getInfections: function(req, res){
        Sick.find().sort('infectedDay ASC')
            .then(function( entries ){
                var data = [];
                _.each(entries, function(entry){
                    data.push( entry.infectedDay ); // get ms
                });
                return data;
            })
            .then(function(data){
                console.log(data);
                // Sort by date

                // Group by year
                var data = _.groupBy(data, function(date){
                    return date;
                });
                console.log(data);
                // Put in correct format
                var finalData = [];
                _.each(data, function( value, key ){
                    console.log(new Date(parseInt(key)));
                    finalData.push( [key, value.length ] ) // get ms
                });
                console.log(finalData);
                return res.ok({data: finalData});
            })
            // Catch error
            .catch(function(err){
                return res.serverError(err);
            });

        function stackSame( data ){

        }
    },

    getTreatenDiseasesRatio: function(req, res){
        Vaccine.find()
            .then(function(vaccines){
                return Disease.find().then(function(diseases){
                    var data = [0,0]; // treaten / untreaten
                    // loop over all diseases
                    _.each(diseases, function( disease ){
                        // loop over all vaccine
                        // If we found one vaccine then incremente diseases treaten otherwise ..
                        var isTreaten = false;
                        _.each(vaccines, function( vaccine ){
                            if(vaccine.treatenDisease == disease.id){
                                isTreaten = true;
                            }
                        });
                        isTreaten ? data[0]++ : data[1]++;
                    });
                    return data;
                })
            })
            .then(function(data){
                console.log(data);
                return res.ok({data: data});
            })
            .catch(function(err){
                return res.serverError(err);
            });
    },

    getSickPerCountry: function(req, res){
        Country.find().populate('patients')
            .then(function( entries ){
                var data = [];
                _.each(entries, function( entry ){
                    data.push({
                        label: entry.name,
                        data: entry.patients.length
                    });
                });
                return data;
            })
            .then(function(data){
                return res.ok({data: data});
            })
            .catch(function(err){
                return res.serverError(err);
            });
    }

};

module.exports = RestController;

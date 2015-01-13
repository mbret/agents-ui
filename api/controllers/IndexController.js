var Promise = require('bluebird');

/**
 * Index Controller
 *
 */
var IndexController = {

    index: function(req, res){

    var obj = {};

    // Company
    Company.find()
        .then(function(companies){
            obj.companies = companies;
            return;
        })
        // Organizations
        .then(function(){
          return Organization.find().then(function(organizations){
            obj.organizations = organizations;
          });
        })
        // Cities
        .then(function(){
            return City.find().populate('country').then(function( entries ){
                obj.cities = entries;
            });
        })
        // Planes
        .then(function(){
            return Plane.find().populate('company').then(function( entries ){
                obj.planes = entries;
            });
        })
        // Flights
        .then(function(){
            return Flight.find().populate('company').populate('plane').populate('arrivalCity').populate('bookings').then(function(entries){
                obj.flights = entries;
                // fill booking
                _.forEach(entries, function(entry){
                    _.forEach(entry.bookings, function(booking){
                        booking.organization = findOrganizationById( booking.organization, obj.organizations );
                    });
                });
                return;
            });
        })
        // Sick
        .then(function(){
            return Sick.find().populate('country').then(function(entries){
                obj.sick = entries;
            });
        })
        // Diseases
        .then(function(){
            return Disease.find().then(function(entries){
                obj.diseases = entries;
            })
        })
        // Vaccines
        .then(function(){
            return Vaccine.find().populate('treatenDisease').then(function(entries){
               obj.vaccines = entries;
            });
        })
        // Laboratories
        .then(function(){
            return Laboratory.find().then(function(entries){
                obj.laboratories = entries;
                return Laboratory.populateType( obj.laboratories );
            });
        })
        // Stocks
        .then(function(){
            return VaccineStock.find().populate('laboratory').populate('vaccine').then(function(entries){
                obj.stocks = entries;
                return;
            })
        })
        // Results
        .then(function(){
            return res.view('homepage', obj);
        })
        // Catch error
        .catch(function(err){
            return res.serverError(err);
        });

      function findOrganizationById( id, organizationList ){
          var organization = null;
          _.forEach(organizationList, function(entry){
             if(entry.id == id ) organization = entry;
          });
          return organization;
      }
  },

    stats: function(req, res){
        return res.view('graphs');
    },

    organizations: function(req, res){
        Organization.find().then(function(entries){
            return res.view('organizations', {
                organizations: entries
            })
        })
        // Catch error
        .catch(function(err){
            return res.serverError(err);
        });
    }

};

module.exports = IndexController;

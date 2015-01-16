var Promise = require('bluebird');

/**
 * Index Controller
 *
 */
var RestController = {

    getCountries: function(req, res){

        var obj = {};

        // Company
        Country.find().then(function( entries ){
                    obj = entries;
            })
            // Results
            .then(function(){
                return res.ok({data: obj});
            })
            // Catch error
            .catch(function(err){
                return res.serverError(err);
            });
    },

    getOrganizations: function(req, res){
        Organization.find()
            // Results
            .then(function(entries){
                return res.ok({data: entries});
            })
            // Catch error
            .catch(function(err){
                return res.serverError(err);
            });
    },

    getCities: function(req, res){
        City.find().populate('country')
            // Results
            .then(function(entries){
                return res.ok({data: entries});
            })
            // Catch error
            .catch(function(err){
                return res.serverError(err);
            });
    },

    getCompanies: function(req, res){
        Company.find()
            .then(function(entries){
                return res.ok({data: entries});
            })
            .catch(function(err){
                return res.serverError(err);
            })
    },

    //getPlanes: function(req, res){
    //    Plane.find().populate('company')
    //        .then(function(entries){
    //            return res.ok({data: entries});
    //        })
    //        .catch(function(err){
    //            return res.serverError(err);
    //        })
    //},

    getFlights: function(req, res){
        var obj = {};
        Organization.find()
            .then(function(organizations){
                Flight.find().populate('company')/*.populate('plane')*//*.populate('arrivalCity')*/.populate('bookings')
                    .then(function(entries){
                        obj.flights = entries;
                        // fill booking
                        _.forEach(entries, function(entry){
                            entry.type = entry.isCharter ? 'Charter' : 'Normal';
                            _.forEach(entry.bookings, function(booking){
                                booking.organization = findOrganizationById( booking.organization, organizations );
                            });
                        });
                        return res.ok({data: obj.flights});
                    })
            })
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

    getDiseases: function(req, res){
        Disease.find()
            .then(function(entries){
                return res.ok({data: entries});
            })
            .catch(function(err){
                return res.serverError(err);
            });
    },

    getVaccines: function(req, res){
        Vaccine.find().populate('treatenDisease')
            .then(function(entries){
                return res.ok({data: entries});
            })
            .catch(function(err){
                return res.serverError(err);
            });
    },

    getLaboratories: function(req, res){
        // Laboratories
        Laboratory.find()
            .then(function(entries){
                _.each(entries, function(entry){
                    if(entry.isGeneric){
                        entry.type = 'Generic';
                    }
                    else{
                        entry.type = 'Grand group';
                    }
                });
                return res.ok({data: entries});
            })
            .catch(function(err){
                return res.serverError(err);
            })
    },

    getStocks: function(req, res){
        // Stocks
        VaccineStock.find().populate('laboratory').populate('vaccine')
            .then(function(entries){
                return res.ok({data: entries});
            })
            .catch(function(err){
                return res.serverError(err);
            });
    },

    getPatients: function(req, res){
        // Stocks
        Sick.find().populate('country')
            .then(function(entries){
                return res.ok({data: entries});
            })
            .catch(function(err){
                return res.serverError(err);
            });
    },

    createDonation: function(req, res){
        Organization.findOne( req.param('id')).then(function(organization){
            if( !organization ) return res.notFound();
            organization.capital += parseInt(req.param('sum'));
            return organization.save();
        })
        .then(function(){
            res.ok();
        })
        // Catch error
        .catch(function(err){
            return res.serverError(err);
        });
    },

    getBoughtVaccines: function(req, res){
        BoughtVaccine.find().populate('vaccine').populate('laboratory').populate('organization')
            .then(function(entries){
                return res.ok({data: entries});
            })
            .catch(function(err){
                return res.serverError(err);
            });
    }
};

module.exports = RestController;

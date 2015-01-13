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
    }

};

module.exports = RestController;

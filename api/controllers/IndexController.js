var Promise = require('bluebird');

/**
 * Index Controller
 *
 */
var IndexController = {

    index: function(req, res){

        return res.view('homepage');
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

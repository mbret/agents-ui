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

module.exports.bootstrap = function(cb) {

    Promise.all([
        Company.create({
            name: 'company a'
        }),
        Company.create({
            name: 'company b'
        })
    ]).then(function(){
        return cb();
    }).catch(function(err){
        return cb(err);
    });
};

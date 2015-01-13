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
        // Country
        .then(function(){
            return Country.find().then(function( entries ){
                obj.countries = entries;
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
        // Results
        .then(function(){
            return res.view('homepage', obj);
        })
        // Catch error
        .catch(function(err){
            return res.serverError(err);
        });
  }

};

module.exports = IndexController;

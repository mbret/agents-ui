/**
 * Index Controller
 *
 */
var IndexController = {

  index: function(req, res){

    var obj = {
      companies: null,
      organizations: null
    }

    Company.find().then(function(companies){

      obj.companies = companies;
      return;

    }).then(function(){

      return Organization.find().then(function(organizations){
        obj.organizations = organizations;
      })
    }).then(function(){

      return res.view('homepage', obj);

    }).catch(function(err){
      return res.serverError(err);
    })

  }

};

module.exports = IndexController;

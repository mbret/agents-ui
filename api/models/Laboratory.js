var Promise = require('bluebird');

/**
 * Created by Maxime on 12/01/2015.
 */
var Laboratory = {
  //schema: true,
  tableName: 'laboratoire',

    attributes: {
        //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
        name: { type: 'string', columnName: 'nom' },
        isGeneric: { type: 'boolean', columnName: 'isgenerique' },
        /**
         *
         * @returns Promise with type as result
         */
      //  getType: function(){
      //      var vthis = this;
      //      var type = null;
      //      // Test generic labo
      //      return GenericLaboratory.findOne(vthis.id).then(function(entry){
      //          if(entry){
      //              type = "Generic"
      //              return true;
      //          }
      //          else{
      //              return false;
      //          }
      //      }).then(function( found ){
      //          if( found ) return;
      //          return GrandGroupLaboratory.findOne(vthis.id).then(function(entry){
      //              if(entry){
      //                  type = "Grand group"
      //              }
      //          })
      //      }).then(function(){
      //          return type;
      //      });
      //}
  },

    //populateType: function( entries ){
    //    return Promise.map( entries, function( entry ){
    //        return entry.getType().then(function(type){
    //            entry.type = type;
    //        });
    //    });
    //}
}
module.exports = Laboratory;

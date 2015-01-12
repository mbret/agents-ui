/**
 * Created by Maxime on 12/01/2015.
 */
var Laboratory = {
  //schema: true,
  tableName: 'labotatoire',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    name: { type: 'string', columnName: 'nom' }
  }
}
module.exports = Laboratory;

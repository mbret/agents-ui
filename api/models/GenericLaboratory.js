/**
 * Created by Maxime on 12/01/2015.
 */
var GenericLaboratory = {
  //schema: true,
  tableName: 'generique',

  attributes: {
      id  : { model: 'laboratory', unique: true, primaryKey: true, required:true, columnName: 'id', autoIncrement: false }
  }
}
module.exports = GenericLaboratory;

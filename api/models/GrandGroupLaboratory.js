/**
 * Created by Maxime on 12/01/2015.
 */
var GrandGroupeLaboratory = {
  //schema: true,
  tableName: 'grandGroupe',

  attributes: {
      id  : { model: 'laboratory', unique: true, primaryKey: true, required:true, columnName: 'id', autoIncrement: false }
  }

}
module.exports = GrandGroupeLaboratory;

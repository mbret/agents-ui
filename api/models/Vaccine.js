
var Vaccine = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'vaccin',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    name  : { type: 'string',  columnName: 'nom' },
    expire  : { type: 'date', columnName: 'expire' },
    price  : { type: 'float', columnName: 'prix'},
    treatenDisease  : { model: 'disease' }
  }

};

module.exports = Vaccine;

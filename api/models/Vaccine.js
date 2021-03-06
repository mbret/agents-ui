
var Vaccine = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'vaccin',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    name  : { type: 'string',  required: true, columnName: 'nom' },
    expire  : { type: 'integer', required: true, columnName: 'periodePeremption' }, // days
    price  : { type: 'float', required: true, columnName: 'prix'},
    treatenDisease  : { model: 'disease', required: true, columnName: 'maladieTraitee' },
    size: { type: 'integer', columnName: 'taille' }
  }

};

module.exports = Vaccine;

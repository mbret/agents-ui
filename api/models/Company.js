var Company = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'compagnie',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    name     : { type: 'string',  unique: true, columnName: 'nom' },
    planes: { collection: 'plane', via: 'idCompagnie' }
  }

};

module.exports = Company;

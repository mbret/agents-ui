var Company = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'compagnie',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    name     : { type: 'string',  required: true, unique: true, columnName: 'nom' },
    //planes: { collection: 'plane', via: 'company' }
    balance: { type:'integer', required: true, columnName: 'solde'}
  }

};

module.exports = Company;

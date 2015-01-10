var Organization = {

  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName: 'association',

  attributes: {
    id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    name     : { type: 'string',  unique: true, columnName: 'nom' },
    capital     : { type: 'number', columnName: 'capital' }
  }

};

module.exports = Organization;

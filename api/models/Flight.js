var Flight = {

  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName: 'vol',

  attributes: {
    id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
  }

};

module.exports = Flight;

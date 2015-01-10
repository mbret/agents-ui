var Sick = {

  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName: 'malade',

  attributes: {
    id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
  }

};

module.exports = Sick;

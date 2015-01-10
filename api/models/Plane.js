var Plane = {

  // Enforce model schema in the case of schemaless databases
  schema: true,
  tableName: 'avion',

  attributes: {
    id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    company: { model: 'company' }
  }

};

module.exports = Plane;

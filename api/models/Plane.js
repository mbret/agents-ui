var Plane = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'avion',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    company: { model: 'company', required: true, columnName: 'idCompagnie' },
    capacity: { type: 'integer', required: true, columnName: 'capacite' }
  }

};

module.exports = Plane;

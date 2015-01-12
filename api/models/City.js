var City = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'ville',

  attributes: {
      //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
      name: { type:'string', unique: true, columnName: 'nom', required: true},
      country: { model: 'Country', required: true }
  }

};

module.exports = City;

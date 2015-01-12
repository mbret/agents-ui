var Country = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'pays',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
  }

};

module.exports = Country;

var Disease = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'maladie',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    name: { type: 'string', columnName: 'nom' },
    incubation: { type: 'integer', columnName: 'incubation' }, // in days,
    virulence: { type: 'integer', enum: [1,2,3,4,5], columnName: 'virulence' }
  }

};

module.exports = Disease;

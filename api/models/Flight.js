var Flight = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'vol',

  attributes: {
    //id  : { type: 'string', unique: true, primaryKey: true, columnName: 'id', autoIncrement: true },
    company: { model: 'company', columnName: 'compagnie', required: true },
    plane: { model: 'plane', columnName: 'avion', required: true },
    type: { type: 'string', columnName: 'type', required: true, enum: ['charter', ''] },
    minGain: { type: 'integer' },
    totalGain: { type: 'integer' },
    pricePerLot: { type: 'integer' },
    departureDatePlanned: { type: 'date' },
    departureDateReal: { type: 'date' },
    arrivalDate: { type: 'integer' }, // timestamp
    arrivalCity: { type: 'integer' }
  },

  beforeCreate: function (values, cb) {
    values.foo = new Date();
    return cb();
  },

  beforeUpdate: function (valuesToUpdate, cb) {
    valuesToUpdate.foo = new Date();
    return cb();
  }

};

module.exports = Flight;

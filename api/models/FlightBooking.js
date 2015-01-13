var FlightBooking = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'reservation',

  attributes: {
      organization: { model: 'organization', required: true, columnName:'idAsso' },
      flight: { model: 'flight', required: true, columnName:'idVol' },
      seats: { type:'integer', required: true, columnName:'nbPlaces' }
  }

};

module.exports = FlightBooking;

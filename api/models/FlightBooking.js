var FlightBooking = {

  // Enforce model schema in the case of schemaless databases
  //schema: true,
  tableName: 'reservationvol',

  attributes: {
      organization: { model: 'organization', required: true, columnName:'idAsso' },
      flight: { model: 'flight', required: true, columnName:'idVol' },
      seats: { type:'integer', required: true, columnName:'nbPlaces' },
      price: { type: 'integer', required: true, columnName: 'prix' }
  }

};

module.exports = FlightBooking;

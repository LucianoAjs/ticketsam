export const CREATE_TICKET = {
  API_OPERATION: {
    SUMMARY: 'Create ticket',
    DESCRIPTION: 'This endpoint is for create ticket',
  },
  API_RESPONSE: {
    SUCCESS_OPERATION: {
      DESC: 'SuccessFully operation',
      VALUE: '',
    },
    UNAUTHORIZED_OPERATION: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
  API_PROPERTY: {
    ACCOMODATION_NAME: { DESC: 'Accomodation name', VALUE: 'rede' },
    DESTINATION_CITY: { DESC: 'Destination city', VALUE: 'Tabatinga' },
    HOME_CITY: { DESC: 'Home city', VALUE: 'Manaus' },
    DT_ARRIVAL: { DESC: 'Date arrival', VALUE: '2022-11-06 12:00:00' },
    DT_MODIFICATION: {
      DESC: 'Date Modification',
      VALUE: '2022-01-25T20:31:45.000Z',
    },
    DT_RECORD: { DESC: 'Date record', VALUE: '2022-01-25T20:31:45.000Z' },
    DT_OUTPUT: { DESC: 'Date output', VALUE: '2022-10-31 17:00:00' },
    BOAT_NAME: { DESC: 'Boat Name', VALUE: 'F/B MARIA MONTEIRO' },
    BOAT_PHONE: { DESC: 'Boat phone', VALUE: '92 32224467' },
    IMAGE_URL: {
      DESC: 'Boat image url',
      VALUE:
        'https://unknowfiles.s3.sa-east-1.amazonaws.com/images/f1361ad2-89bd-4616-84e1-551f3fedcc5',
    },
    REMAINING_QUANTITY: { DESC: 'Remaining quantity', VALUE: '497' },
    FOOD_VALUE: { DESC: 'Food value', VALUE: '200' },
    TRANSPORT_VALUE: { DESC: 'Transport', VALUE: '225' },
  },
  API_QUERY: {
    BOAT_ID: {
      DESC: 'Boat id',
      VALUE: '1',
    },
  },
};

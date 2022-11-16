export const VALIDATE_TICKET = {
  API_OPERATION: {
    SUMMARY: 'Validate ticket',
    DESCRIPTION: 'This endpoint is for validate ticket',
  },
  API_RESPONSE: {
    SUCCESS_OPERATION: {
      DESC: 'SuccessFully operation',
      VALUE: 'Ticket validated successfully',
    },
    UNAUTHORIZED_OPERATION: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
  API_PROPERTY: {
    PAYMENT_ID: {
      DESC: 'Payment id.',
      VALUE: '1',
    },
    TICKET_ID: {
      DESC: 'Ticket id.',
      VALUE: '1',
    },
  },
};

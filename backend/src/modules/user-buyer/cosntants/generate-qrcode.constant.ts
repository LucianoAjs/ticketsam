export const GENERATE_QRCODE = {
  API_OPERATION: {
    SUMMARY: 'Generate QRcode',
    DESCRIPTION: 'This endpoint is for generate QRcode',
  },
  API_RESPONSE: {
    SUCCESS_OPERATION: {
      DESC: 'SuccessFully operation',
      VALUE: 'QRcode generated successfully',
    },
    UNAUTHORIZED_OPERATION: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
  API_PROPERTY: {
    URL: {
      DESC: 'URL used to generate QRcode.',
      VALUE: 'google.com',
    },
  },
};

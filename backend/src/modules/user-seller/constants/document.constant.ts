export const DOCUMENT = {
  API_OPERATION: {
    SUMMARY: 'Upload documents',
    DESCRIPTION: 'This endpoint is for Upload documents',
  },
  API_RESPONSE: {
    SUCCESS_OPERATION: {
      DESC: 'SuccessFully operation',
      VALUE: 'Documents uploaded with success',
    },
    UNAUTHORIZED_OPERATION: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
  DOCUMENT_FRONT: 'documentFront',
  DOCUMENT_BACK: 'documentBack',
  DOCUMEN_SELFIE: 'selfie',
  INDEX: {
    DOCUMENT_FRONT: 0,
    DOCUMENT_BACK: 1,
    SELFIE: 2,
  },
  EXTENSION: { DESC: 'Document extension.', VALUE: 'png' },
  DATA_URL: {
    DESC: 'Document url.',
    VALUE:
      'https://images.s3.amazonaws.com/documentFront/4545454545454545454545-documentFront.png',
  },
  DOCUMENT_TYPE: { DESC: 'Document type.', VALUE: 'document_front' },
};

import { BOAT } from '@/modules/user/constants/boat/nested/validate-boat.constant';

export const VALIDATE_BOAT = {
  API_OPERATION: {
    SUMMARY: 'Create new boat',
    DESCRIPTION: 'This endpoint is for create a new boat',
  },
  API_RESPONSE: {
    SUCCESS_OPERATION: {
      DESC: 'SuccessFully operation',
      VALUE: 'pending',
    },
    UNAUTHORIZED_OPERATION: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
  API_PROPERTY: {
    CNPJ: {
      DESC: 'CNPJ.',
      VALUE: '14.326.844/0001-03',
    },

    BOAT,
  },
};

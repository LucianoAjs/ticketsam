import { ADDRESS } from '@/modules/user/constants/nested/address.constant';

export const USER = {
  API_OPERATION: {
    SUMMARY: 'Create new user',
    DESCRIPTION: 'This endpoint is for create a new user',
  },
  API_RESPONSE: {
    SUCCESS_OPERATION: {
      DESC: 'SuccessFully operation',
      VALUE: 'User 1 has been updated',
    },
    UNAUTHORIZED_OPERATION: 'Unauthorized',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
  },
  API_PROPERTY: {
    USER: {
      EMAIL: {
        DESC: 'Email.',
        VALUE: 'luciano@gmail.com',
      },
      PASSWORD: {
        DESC: 'Password.',
        VALUE: 'ADMIN@123',
        REGEX:
          /^(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[0-9a-zA-Z!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{6,}$/,
      },
      FIRST_NAME: {
        DESC: 'First name.',
        VALUE: 'luciano',
      },
      LAST_NAME: {
        DESC: 'Last name.',
        VALUE: 'anjos',
      },
      CPF: {
        DESC: 'CEP.',
        VALUE: '04808850440',
      },
      PHONE_NUMBER: {
        DESC: 'Phone number.',
        VALUE: '982506489',
      },
      BIRTHDATE: {
        DESC: 'Birthdate.',
        VALUE: '06/04/2000',
      },
      GENDER: {
        DESC: 'Gender.',
        VALUE: 'M',
      },
      ADDRESS,
    },
  },
};

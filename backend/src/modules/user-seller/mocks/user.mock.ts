import { UserDto } from '@/modules/user-seller/dto/user';
import { UserResponseDto } from '@/modules/user-seller/dto/user/user-response.dto';
import { HttpStatus } from '@nestjs/common';

export class UserMock {
  public static mockUserRequest = (): UserDto => {
    return {
      id: '575f56b2-1ed3-47a9-9c67-76ff914b4132',
      email: 'luciano@gmail.com',
      firstName: 'luciano',
      lastName: 'anjos',
      cpf: '04808850440',
      phoneNumber: '92982506489',
      password: 'ADMIN@123',
      birthdate: new Date('06/04/2000'),
      gender: 'M',
      address: {
        id: '3a9b99b1-73e0-4d09-96a2-cd746a26c762',
        userId: '575f56b2-1ed3-47a9-9c67-76ff914b4132',
        postalCode: '69097033',
        complement: 'Casa 23',
        state: 'AM',
        city: 'Manaus',
        number: '35',
        neighborhood: 'Adrianópolis',
        street: 'Rua Belo Horizonte',
      },
    };
  };

  public static mockUserResponse = (): UserResponseDto => {
    return {
      statusCode: HttpStatus.CREATED,
      description: `User 575f56b2-1ed3-47a9-9c67-76ff914b4132 has been updated`,
    };
  };
}

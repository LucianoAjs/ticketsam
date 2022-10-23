import { UserRepository } from '@/database/repository/user.repository';
import { UsersLoggerService } from '@/logger/logger.service';
import { UserDto } from '@/modules/user/dto/user';
import { UserResponseDto } from '@/modules/user/dto/user/user-response.dto';
import { UserMock } from '@/modules/user/mocks/user.mock';
import { UserService } from '@/modules/user/services/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    upsertUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UsersLoggerService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = await module.resolve(UserService);
    userRepository = await module.resolve(UserRepository);
  });

  describe('UpdateUser', () => {
    describe('When URL contains a valid body', () => {
      it('should return status code and description message.', async () => {
        const updateUserBodyDtoMock: UserDto = UserMock.mockUserRequest();
        const updateUserResponseMock: UserResponseDto =
          UserMock.mockUserResponse();

        jest
          .spyOn(userRepository, 'upsertUser')
          .mockResolvedValueOnce(updateUserBodyDtoMock);

        const updateUserResult = await service.createUser(
          updateUserBodyDtoMock,
        );

        expect(updateUserResult).toStrictEqual(updateUserResponseMock);
      });
    });
  });
});

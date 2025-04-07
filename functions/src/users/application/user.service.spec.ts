import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../domain/repositories/user.repository';
import { User } from '../domain/entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const mockRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(UserRepository);
  });

  it('should return existing user if found', async () => {
    const mockUser: User = new User('1', 'test@example.com');
    repository.findByEmail.mockResolvedValue(mockUser);

    const result = await service.createUser('test@example.com');

    expect(result).toBe(mockUser);
    expect(repository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(repository.create).not.toHaveBeenCalled();
  });

  it('should create and return new user if not found', async () => {
    repository.findByEmail.mockResolvedValue(null);
    const mockCreatedUser: User = new User('2', 'new@example.com');
    repository.create.mockResolvedValue(mockCreatedUser);

    const result = await service.createUser('new@example.com');

    expect(result).toBe(mockCreatedUser);
    expect(repository.findByEmail).toHaveBeenCalledWith('new@example.com');
    expect(repository.create).toHaveBeenCalledWith('new@example.com');
  });

  it('should find user by email', async () => {
    const mockUser: User = new User('3', 'findme@example.com');
    repository.findByEmail.mockResolvedValue(mockUser);

    const result = await service.findByEmail('findme@example.com');

    expect(result).toBe(mockUser);
    expect(repository.findByEmail).toHaveBeenCalledWith('findme@example.com');
  });
});
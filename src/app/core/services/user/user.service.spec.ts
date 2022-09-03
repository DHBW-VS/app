import { TestBed } from '@angular/core/testing';
import { SessionRepository, User } from '@app/store';
import { createSpyObj } from '@tests/helpers';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let sessionRepositorySpy: jest.Mocked<SessionRepository>;

  const user: User = {
    firstname: 'testFirstname',
    lastname: 'testLastname',
    course: 'WI',
    isStudent: true,
    username: 'testUsername',
  };

  beforeEach(() => {
    sessionRepositorySpy = createSpyObj('SessionRepository', { getUser: undefined });

    TestBed.configureTestingModule({
      providers: [{ provide: SessionRepository, useValue: sessionRepositorySpy }],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty string as username', () => {
    sessionRepositorySpy.getUser.mockReturnValue(undefined);
    const result = service.getUsername();
    expect(result).toBe('');
  });

  it('should return the correct username', () => {
    sessionRepositorySpy.getUser.mockReturnValue(user);
    const result = service.getUsername();
    expect(result).toBe(user.username);
  });

  it('should return an empty string as firstname', () => {
    sessionRepositorySpy.getUser.mockReturnValue(undefined);
    const result = service.getFirstname();
    expect(result).toBe('');
  });

  it('should return the correct firstname', () => {
    sessionRepositorySpy.getUser.mockReturnValue(user);
    const result = service.getFirstname();
    expect(result).toBe(user.firstname);
  });

  it('should return an empty string as lastname', () => {
    sessionRepositorySpy.getUser.mockReturnValue(undefined);
    const result = service.getLastname();
    expect(result).toBe('');
  });

  it('should return the correct lastname', () => {
    sessionRepositorySpy.getUser.mockReturnValue(user);
    const result = service.getLastname();
    expect(result).toBe(user.lastname);
  });

  it('should return an empty string as course', () => {
    sessionRepositorySpy.getUser.mockReturnValue(undefined);
    const result = service.getCourse();
    expect(result).toBe('');
  });

  it('should return the correct course', () => {
    sessionRepositorySpy.getUser.mockReturnValue(user);
    const result = service.getCourse();
    expect(result).toBeTruthy();
    expect(result).toBe(user.course || '');
  });

  it('should return false as result for isStudent', () => {
    sessionRepositorySpy.getUser.mockReturnValue(undefined);
    const result = service.isStudent();
    expect(result).toBeFalsy();
  });

  it('should return the correct result for isStudent', () => {
    sessionRepositorySpy.getUser.mockReturnValue(user);
    const result = service.isStudent();
    expect(result).toBe(user.isStudent);
  });
});

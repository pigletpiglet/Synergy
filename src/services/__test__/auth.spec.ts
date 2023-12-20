import { LoginRequest, RegisterRequest } from '../../models/dto/auth';
import UsersRepository from '../../repositories/users';
import AuthService from '../auth';

describe('login', () => {
  it('should return JWT Token', async () => {
    const expectedCarResponse = {
    };

    /** creating dependency of use case */
    const mockUsersRepository = new UsersRepository();

    /** mocking needed function */
    mockUsersRepository.getCars = jest
      .fn()
      .mockImplementation(() => Promise.resolve([expectedCarResponse]));

    const authService = new AuthService(mockUsersRepository);

    const generatedCar = await authService.login("bola",);
    expect(generatedCar[0].id).toEqual(expectedCarResponse.id);
    expect(generatedCar[0].name).toEqual(expectedCarResponse.name);
  });
});

describe('createCar', () => {

  it('should return correct car data', async () => {
    const expectedCarResponse: CarRequest = {
      name: 'Mobil_Testing_2',
      price: 2000,
      size: "2",
      user_id: 5,
      updatedAt: Date.now()
    };

    /** creating dependency of use case */
    const mockCarsRepository = new CarsRepository();

    /** mocking needed function */
    mockCarsRepository.createCar = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectedCarResponse));

    const carsService = new CarsService(mockCarsRepository);

    const car = await carsService.createCar(expectedCarResponse);

    expect(car.name).toEqual(expectedCarResponse.name);
  });
});


// import bcrypt from 'bcrypt';
// import config from 'config';
// import jwt from 'jsonwebtoken';
// import { HttpException } from '@exceptions/HttpException';
// import { DataStoredInToken, TokenData } from '@/interfaces/orders.interface';
// import { User } from '@interfaces/users.interface';
// import userModel from '@models/users.model';
// import { isEmpty } from '@utils/util';

// class OrdersService {
//   public order = orderModel;

//   public async signup(userData): Promise<User> {
//     if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

//     const findUser: User = await this.users.findOne({ email: userData.email });
//     if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

//     const hashedPassword = await bcrypt.hash(userData.password, 10);
//     const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

//     return createUserData;
//   }

//   public async login(userData): Promise<{ cookie: string; findUser: User }> {
//     if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

//     const findUser: User = await this.users.findOne({ email: userData.email });
//     if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

//     const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
//     if (!isPasswordMatching) throw new HttpException(409, "You're password not matching");

//     const tokenData = this.createToken(findUser);
//     const cookie = this.createCookie(tokenData);

//     return { cookie, findUser };
//   }

//   public async logout(userData: User): Promise<User> {
//     if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

//     const findUser: User = await this.users.findOne({ email: userData.email, password: userData.password });
//     if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);

//     return findUser;
//   }

//   public createToken(user: User): TokenData {
//     const dataStoredInToken: DataStoredInToken = { _id: user._id };
//     const secretKey: string = config.get('secretKey');
//     const expiresIn: number = 60 * 60;

//     return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
//   }

//   public createCookie(tokenData: TokenData): string {
//     return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
//   }
// }

// export default AuthService;

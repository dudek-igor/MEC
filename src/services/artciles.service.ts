import bcrypt from 'bcrypt';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { Product } from '@interfaces/products.interface';
import productModel from '@models/products.model';
import { isEmpty } from '@utils/util';

class ProductService {
  public product = productModel;

  public async getAllAProduct(): Promise<Product[]> {
    const products: Product[] = await this.product.find();
    return products;
  }

  public async findProductById(productId: number): Promise<Product> {
    if (isEmpty(productId)) throw new HttpException(400, 'Invalid prodcut id');
    const productDetails: Product = await this.product.findOne({ productId: productId });
    if (!productDetails) throw new HttpException(400, 'Invalid prodcut id');
    return productDetails;
  }

  // public async createUser(userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   const findUser: User = await this.users.findOne({ email: userData.email });
  //   if (findUser) throw new HttpException(409, `You're email ${userData.email} already exists`);

  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

  //   return createUserData;
  // }

  // public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
  //   if (isEmpty(userData)) throw new HttpException(400, "You're not userData");

  //   if (userData.email) {
  //     const findUser: User = await this.users.findOne({ email: userData.email });
  //     if (findUser && findUser._id != userId) throw new HttpException(409, `You're email ${userData.email} already exists`);
  //   }

  //   if (userData.password) {
  //     const hashedPassword = await bcrypt.hash(userData.password, 10);
  //     userData = { ...userData, password: hashedPassword };
  //   }

  //   const updateUserById: User = await this.users.findByIdAndUpdate(userId, { userData });
  //   if (!updateUserById) throw new HttpException(409, "You're not user");

  //   return updateUserById;
  // }

  // public async deleteUser(userId: string): Promise<User> {
  //   const deleteUserById: User = await this.users.findByIdAndDelete(userId);
  //   if (!deleteUserById) throw new HttpException(409, "You're not user");

  //   return deleteUserById;
  // }
}

export default ProductService;

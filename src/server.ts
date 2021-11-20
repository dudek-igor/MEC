process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import AppServer from '@/app';
import OrdersRoute from '@routes/orders.route';
import IndexRoute from '@routes/index.route';
import ProductsRoute from '@routes/products.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const server = new AppServer([new IndexRoute(), new ProductsRoute(), new OrdersRoute()]);

server.listen();

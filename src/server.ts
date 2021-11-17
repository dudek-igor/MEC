process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import OrdersRoute from '@routes/orders.route';
import IndexRoute from '@routes/index.route';
import ProductsRoute from '@routes/products.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new ProductsRoute(), new OrdersRoute()]);

app.listen();

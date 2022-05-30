import type { Sequelize } from "sequelize";
import { order as _orders } from "./order";
import { orderdetail as _details } from "./orderdetail";
import { product as _products } from "./product";
import type {orderAttributes, orderCreationAttributes} from "./order";
import type { orderdetailAttributes, orderdetailCreationAttributes } from "./orderdetail";
import type { productAttributes, productCreationAttributes} from "./product";

export {
  _orders as order,
  _details as orderdetail,
  _products as product,
};

export type {
  productAttributes,
  productCreationAttributes,
  orderAttributes,
  orderCreationAttributes,
  orderdetailAttributes,
  orderdetailCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
 const product      = _products.initModel(sequelize);
 const order        = _orders.initModel(sequelize);
 const orderDetail  = _details.initModel(sequelize);

  return {
    product: product,
    order: order,
    orderDetail: orderDetail,
  };
}

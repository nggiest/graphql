import {Sequelize} from "sequelize";
import { initModels, product, productCreationAttributes, order, orderCreationAttributes, orderdetailCreationAttributes, orderdetail} from "./models/init-models";
import * as dotenv from "dotenv";
import { readFileSync } from "fs";
import {ApolloServer} from "apollo-server";
import { v4 as uuidv4 } from 'uuid';

const typeDefs = readFileSync("./src/tugas.graphql").toString('utf-8');
dotenv.config();
// process.env

const sequelize = new Sequelize(
	process.env.DB_NAME as string,
	process.env.DB_USER as string,
	process.env.DB_PASS as string, {
	host: process.env.DB_HOST as string,
	dialect: 'mysql'
});

initModels(sequelize);

const resolvers = {
    Query: {
        product     : async () => await product.findAll(),
        order       : async () => await order.findAll(),
    },
    Mutation: {
        GetDetailProduct: async (_parent: any, args: any) => {
			return await product.findByPk(args.id);
		},
		CreateProduct: async (_parent: any, args: any) => {
			const now = new Date();

			const newProduct: productCreationAttributes = {
                id: args.id,
				name: args.name,
                stock: args.stock,
                price: args.price,
				created: new Date(),

			}
			return await product.create(newProduct);
		},
		UpdateProduct: async (_parent: any, args: any) => {
			return await product.update({
				name: args.name,
                stock: args.stock,
                price: args.price,
			}, {
				where: {
					id: args.id
				}
			})
		},
		DeleteProduct: async (_parent: any, args: any) => {
			return await product.destroy({
				where: {
					id: args.id
				}
			})
		},

        getDetailOrder: async (_parent: any, args: any) => {
            return await order.findByPk(args.id);
          },
      
          createOrder: async (_parent: any, args: any) => {
            const now = new Date();
            const generator = uuidv4();
      
            const newOrder: orderCreationAttributes = {
              transcode: generator,
              created: now.toDateString(),
            };
            const res =  await order.create(newOrder);

            const findProduct = await product.findByPk(args.productId)
            await product.update({stock:Number(findProduct?.stock)-args.quantity}, { where: { id: args.productId } });
            const price = Number(findProduct?.price) 
    
            const newOrderDetail: orderdetailCreationAttributes = {
              product_id:Number(findProduct?.id),
              quantity:args.quantity,
              price: price,
              order_id: res.id
            }
            await orderdetail.create(newOrderDetail)
            return res;
          },
      
          updateOrder: async (_parent: any, args: any) => {
            const generator = uuidv4();
      
            const updOrder = {
              transcode: generator,
            };
            await order.update(updOrder, { where: { id: args.id } });
            return await order.findByPk(args.id);
          },
      
          deleteOrder: (_parent: any, args: any) => {
            order.destroy({ where: { id: args.id } });
            return order.findByPk(args.id);
          },

    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
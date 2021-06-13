import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Product, Product_Categories, Product_Sub_Categories } from 'App/Models/Product';

export default class ProductsController {
    public async createProductCategories({ auth, request, response }: HttpContextContract) {
        await auth.authenticate();

        const product_categories = new Product_Categories();
        product_categories.name = request.input('name');
        product_categories.status = request.input('status');

        await product_categories.save()
        return response.json({
            status: 201,
            message: 'Product Category Created Succussfully',
            product_categories
        })
    }

    // create product sub categories
    public async createProductSubCategories({ auth, request, response }: HttpContextContract) {
        await auth.authenticate();

        const product_sub_categories = new Product_Sub_Categories();
        product_sub_categories.name = request.input('name');
        product_sub_categories.product_category_id = request.input('product_category_id');
        product_sub_categories.status = request.input('status');

        await product_sub_categories.save()
        return response.json({
            status: 201,
            message: 'Product Sub Category Created Succussfully',
            product_sub_categories
        })
    }

    public async createProduct({ auth, request, response }: HttpContextContract) {
        const user = await auth.authenticate();
        const user_id =  user.$attributes.id

        const product = new Product();
        product.user_id = user_id
        product.product_category_id = request.input('product_category_id');
        product.product_sub_category_id = request.input('product_sub_category_id');
        product.title = request.input('title');
        product.description = request.input('description');
        product.price = request.input('price');


        await product.save()
        return response.json({
            status: 201,
            message: 'Product Created Succussfully',
            product
        })
    }

    async updateProduct({ request,  response, auth, params: {id} ,}) {
        await auth.authenticate();
        let product = await Product.find(id);
        if(!product){
            return response.json({
                status: 500,
                message: `Cannot find product with id ${id}`
            })
        }
        const { title, description, price } = request.body()
        product.title = title
        product.description = description
        product.product_category_id = price


        const newProduct = await product.save()
        return response.json({
            status: 'Product Updated Succussfully',
            newProduct
        })
      }
    
      async deleteProduct({  response, auth, params: {id} ,}) {
        await auth.authenticate();
        const product = await Product.find(id)
        if(!product){
            return response.json({
                status: 500,
                message: `Cannot find product with id ${id}`
            })
        }
        product?.delete()

        return response.json({
            status: 200,
            message: 'Product deleted  Succussfully',
        })
      }

      async getProduct({  response, auth, params: {id} ,}) {
        await auth.authenticate();
        const product = await Product.find(id)

        return response.json({
            status: 'Product deleted  Succussfully',
            product
        })
      }
}

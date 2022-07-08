import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {

    /**
     * Retorna uma lista com todas as categorias cadastradas
     * 
     * @returns Categories
     */
    public async list({}: HttpContextContract) {
        return Category.all()
    }

    /**
     * Cadastra uma nova categoria
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(CategoryValidator)

        const category = await Category.create(data)

        return response.created(category)
    }

    /**
     * Altera uma categoria
     * 
     * @param params id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const data = await request.validate(CategoryValidator)

        const category = await Category.findOrFail(params.id)

        category.name = data.name

        category.save()

        return response.status(204)
    }

    /**
     * Deleta uma categoria
     * 
     * @param params id
     * @param response ResponseContract
     * @returns Response 
     */
    public async destroy({ params, response }: HttpContextContract) {
        const category = await Category.findOrFail(params.id)

        category.delete()

        return response.status(204)
    }

}

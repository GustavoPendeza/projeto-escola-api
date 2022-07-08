import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Lesson from 'App/Models/Lesson'
import LessonValidator from 'App/Validators/LessonValidator'

export default class LessonsController {

    public async list({}: HttpContextContract) {
        return Lesson.all()
    }

    /**
     * Cadastra uma nova matéria
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(LessonValidator)

        await Category.findOrFail(data.categoryId)

        const lesson = await Lesson.create(data)

        return response.created(lesson)
    }

    /**
     * Altera uma matéria
     * 
     * @param params id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const lesson = await Lesson.findOrFail(params.id)

        const data = await request.validate(LessonValidator)

        await Category.findOrFail(data.categoryId)

        lesson.name = data.name
        lesson.description = data.description
        lesson.categoryId = data.categoryId

        lesson.save()

        return response.status(204)
    }

    /**
     * Deleta uma matéria
     * 
     * @param params id
     * @param response ResponseContract
     * @returns Response
     */
    public async destroy({ params, response }: HttpContextContract) {
        const lesson = await Lesson.findOrFail(params.id)

        lesson.delete()

        return response.status(204)
    }

}

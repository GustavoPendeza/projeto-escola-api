import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Lesson from 'App/Models/Lesson'
import Teacher from 'App/Models/Teacher'
import User from 'App/Models/User'
import TeacherValidator from 'App/Validators/TeacherValidator'

export default class TeachersController {

    /**
     * Retorna todos os professores cadastrados em matérias
     * 
     * @returns Array<Teacher>
     */
    public async list() {
        return Teacher.all()
    }

    /**
     * Cadastra um professor em uma matéria
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(TeacherValidator)

        const user = await User.findOrFail(data.userId)
        const lesson = await Lesson.findOrFail(data.lessonId)

        if (user.access !== 1) {
            return response.status(406).json({
                message: 'O usuário selecionado não é um professor'
            })
        }

        const cadastrado = await Teacher.query().where('userId', user.id).andWhere('lessonId', lesson.id)

        if (cadastrado.length === 1) {
            return response.status(406).json({
                message: 'O(A) professor(a) já está cadastrado(a) nessa matéria'
            })
        }

        const teacher = await Teacher.create(data)

        return response.created(teacher)
    }

    /**
     * Altera um professor e/ou a matéria em que ele está cadastrado
     * 
     * @param params id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async update({ params, request, response }: HttpContextContract) {
        const teacher = await Teacher.findOrFail(params.id)

        const data = await request.validate(TeacherValidator)
        
        const user = await User.findOrFail(data.userId)
        const lesson = await Lesson.findOrFail(data.lessonId)
        
        if (user.access !== 1) {
            return response.status(406).json({
                message: 'O usuário selecionado não é um professor'
            })
        }

        const cadastrado = await Teacher.query().where('userId', user.id).andWhere('lessonId', lesson.id)

        if (cadastrado.length === 1) {
            return response.status(406).json({
                message: 'O professor já está cadastrado nessa matéria'
            })
        }

        teacher.userId = data.userId
        teacher.lessonId = data.lessonId
        await teacher.save()

        return response.status(204)
    }

    /**
     * Deleta um professor
     * 
     * @param params id
     * @param response ResponseContract
     * @returns Response
     */
    public async destroy({ params, response }: HttpContextContract) {
        const teacher = await Teacher.findOrFail(params.id)

        await teacher.delete()

        return response.status(204)
    }

}

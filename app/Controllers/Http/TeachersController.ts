import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment';
import Lesson from 'App/Models/Lesson'
import Teacher from 'App/Models/Teacher'
import User from 'App/Models/User'
import TeacherAndEnrollmentValidator from 'App/Validators/TeacherAndEnrollmentValidator';

export default class TeachersController {

    /**
     * Retorna todos os professores cadastrados em matérias
     * 
     * @returns Array<Teacher>
     */
    public async list() {
        return Teacher.query().preload('user').preload('lesson')
    }

    /**
     * Retorna todas as matérias em que o professor autenticado está cadastrado
     * 
     * @param auth AuthContract
     * @returns Array<Teacher>
     */
    public async myLessons({ auth }: HttpContextContract) {
        const lessons = await Teacher.query().where('userId', auth.user!.id).preload('lesson')

        return lessons
    }
    
    /**
     * Retorna todos os alunos que estão cadastrados nas matérias do professor autenticado
     * 
     * @param auth AuthContract
     * @returns Array<Enrollment>
     */
    public async myStudents({ auth }: HttpContextContract) {
        await auth.user!.load('teacher')
        const lessons = auth.user!.teacher.map(t => t.lessonId)
        const lessonsId = [... lessons ?? []]

        const students = await Enrollment.query().whereIn('lessonId', lessonsId).preload('user').preload('lesson')

        return students
    }

    /**
     * Cadastra um professor em uma matéria
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ request, response }: HttpContextContract) {
        const data = await request.validate(TeacherAndEnrollmentValidator)

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

        const data = await request.validate(TeacherAndEnrollmentValidator)
        
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

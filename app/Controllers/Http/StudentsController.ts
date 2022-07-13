import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment'
import User from 'App/Models/User'

export default class StudentsController {

    /**
     * Retorna todos os usuários que são alunos
     * 
     * @returns Array<User>
     */
    public async list() {
        const students = await User.query().where('access', 0)

        return students
    }

    /**
     * Retorna todos as matérias em que o usuário autenticado está matriculado
     * 
     * @param auth AuthContract
     * @returns Array<Enrollment>
     */
     public async myEnrollments({ auth }: HttpContextContract) {
        const enrollments = await Enrollment.query().where('userId', auth.user!.id).preload('lesson')

        return enrollments
    }

}

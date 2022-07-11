import { DateTime } from 'luxon';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enrollment from 'App/Models/Enrollment'
import Lesson from 'App/Models/Lesson'
import User from 'App/Models/User'
import EnrollmentValidator from 'App/Validators/EnrollmentValidator';

export default class EnrollmentsController {

    /**
     * Retorna todas as matrículas
     * 
     * @returns Enrollment
     */
    public async list() {
        return Enrollment.all()
    }

    /**
     * Cadastra um aluno em uma matéria
     * 
     * @param auth AuthContract
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async store({ auth, request, response }: HttpContextContract) {
        const data = await request.validate(EnrollmentValidator)

        const user = await User.findOrFail(auth.user!.id)
        const lesson = await Lesson.findOrFail(data.lessonId)

        const matriculado = await Enrollment.query().where('userId', user.id)

        let aulasBimestre = 0
        
        let agora = new Date
        agora.setDate(DateTime.now().toJSDate().getDate())
        
        for (let i = 0; i < matriculado.length; i++) {
            if (user.id === matriculado[i].userId && lesson.id === matriculado[i].lessonId) {
                return response.status(406).json({
                    message: 'Você já está matriculado(a) nessa matéria'
                })
            }

            let dataMatricula = new Date(matriculado[i].createdAt.toJSDate())
            dataMatricula.setDate(dataMatricula.getDate() + 90)
            
            if (dataMatricula > agora) {
                aulasBimestre = aulasBimestre + 1
            }

            if (aulasBimestre === 4) {
                return response.status(406).json({
                    message: 'Você já está matriculado(a) no máximo de matérias no momento'
                })
            }
        }

        const enrollment = new Enrollment
        enrollment.userId = user.id
        enrollment.lessonId = data.lessonId
        await enrollment.save()

        return response.created(enrollment)
    }

}

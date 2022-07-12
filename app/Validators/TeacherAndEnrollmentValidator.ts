import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TeacherAndEnrollmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.number([]),
    lessonId: schema.number([])
  })

  public messages: CustomMessages = {
    'userId:required': 'O campo de usuário é obrigatório',
    'userId:number': 'UserId deve ser um número',
    'lessonId:required': 'O campo de matéria é obrigatório',
    'lessonId:number': 'LessonId deve ser um número'
  }
}

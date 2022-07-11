import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EnrollmentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    lessonId: schema.number([])
  })

  public messages: CustomMessages = {
    'lessonId:required': 'O campo de matéria é obrigatório',
    'lessonId:number': 'LessonId deve ser um número'
  }
}

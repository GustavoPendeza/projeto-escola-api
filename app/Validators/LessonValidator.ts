import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LessonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: 'lessons', column: 'name', caseInsensitive: true })
    ]),
    description: schema.string({ trim: true, escape: true }, []),
    categoryId: schema.number([])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'name.unique': 'Esse nome de categoria já está sendo utilizado',
    'description:required': 'O campo de descrição é obrigatório',
    'categoryId:required': 'O campo de categoria é obrigatório',
    'categoryId:number': 'CategoryId deve ser um número'
  }
}

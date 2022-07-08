import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CategoryValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: 'categories', column: 'name', caseInsensitive: true })
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'name.unique': 'Esse nome de categoria já está sendo utilizado'
  }
}

import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    tenantId: this.ctx.params.id
  })

  public schema = schema.create({
    name: schema.string({ trim: true }, []),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true, whereNot: { id: this.refs.tenantId } })
    ]),
    access: schema.enum([
      0, 1, 2
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'email.required': 'O campo e-mail é obrigatório',
    'email.unique': 'Esse e-mail já está sendo utilizado',
    'access.required': 'O tipo de acesso é obrigatório',
    'access.enum': 'O tipo de acesso deve ser 0, 1 ou 2'
  }
}

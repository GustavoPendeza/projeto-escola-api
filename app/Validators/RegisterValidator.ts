import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, []),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email', caseInsensitive: true })
    ]),
    password: schema.string({ trim: true }, [
      rules.confirmed('password_confirmation'),
      rules.minLength(6)
    ]),
    access: schema.enum.optional([
      0, 1, 2
    ])
  })

  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'email.required': 'O campo e-mail é obrigatório',
    'email.unique': 'Esse e-mail já está sendo utilizado',
    'password.required': 'O campo senha é obrigatório',
    'password_confirmation.confirmed': 'Os campos senha e confirmar senha devem ser iguais',
    'password.minLength': 'O campo senha deve ter no mínimo 6 caracteres',
    'access.enum': 'O tipo de acesso deve ser 0, 1 ou 2'
  }
}

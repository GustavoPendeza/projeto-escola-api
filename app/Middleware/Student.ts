import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Student {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {

    /**
     * Verifica se o usuário autenticado é um Estudante
     */
     if (auth.user!.access !== 0) {
      return response.status(401).json({
        message: 'Você não tem permissão para realizar essa ação.'
      })
    }

    await next()
  }
}

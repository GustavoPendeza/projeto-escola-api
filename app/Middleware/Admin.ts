import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Admin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    
    /**
     * Verifica se o usuário autenticado é um Administrador
     */
    if (auth.user!.access !== 2) {
      return response.status(403).json({
        message: 'Você não tem permissão para realizar essa ação.'
      })
    }

    await next()
  }
}

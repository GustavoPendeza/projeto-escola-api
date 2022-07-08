import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'

export default class AuthController {

    /**
     * Cadastra um usuário como estudante
     * 
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async register({ request, response }: HttpContextContract) {
        const data = await request.validate(RegisterValidator)

        data.access = 0        

        const user = await User.create(data)

        return response.created(user)
    }

    /**
     * Realiza o login do usuário
     * 
     * @param auth AuthContract
     * @param request RequestContract
     * @returns Bearer token
     */
    public async login({ auth, request }: HttpContextContract) {
        const { email, password } = request.all()

        const token = await auth.attempt(email, password)

        return token.toJSON()
    }

}

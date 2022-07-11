import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import PasswordUpdateValidator from 'App/Validators/PasswordUpdateValidator'
import ProfileUpdateValidator from 'App/Validators/ProfileUpdateValidator'
import UserUpdateValidator from 'App/Validators/UserUpdateValidator'

export default class UsersController {

    public async list() {
        return User.all()
    }

    /**
     * Altera o usuário autenticado
     * 
     * @param auth AuthContract
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async profileUpdate({ auth, request, response }: HttpContextContract) {
        const user = await User.findOrFail(auth.user!.id)

        const data = await request.validate(ProfileUpdateValidator)

        user.name = data.name
        user.email = data.email
        await user.save()

        return response.status(204)
    }

    /**
     * Altera a senha do usuário autenticado
     * 
     * @param auth AuthContract
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async passwordUpdate({ auth, request, response }: HttpContextContract) {
        const user = await User.findOrFail(auth.user!.id)

        const data = await request.validate(PasswordUpdateValidator)

        user.password = data.password
        await user.save()

        return response.status(204)
    }

    /**
     * Altera um usuário (apenas o Admin pode alterar)
     * 
     * @param params id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async userUpdate({ params, request, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        const data = await request.validate(UserUpdateValidator)

        user.name = data.name
        user.email = data.email
        user.access = data.access
        await user.save()

        return response.status(204)
    }

    /**
     * Altera a senha de um usuário (apenas o Admin pode alterar)
     * 
     * @param params id
     * @param request RequestContract
     * @param response ResponseContract
     * @returns Response
     */
    public async userPasswordUpdate({ params, request, response }: HttpContextContract) {
        const user = await User.findOrFail(params.id)

        const data = await request.validate(PasswordUpdateValidator)

        user.password = data.password
        await user.save()

        return response.status(204)
    }

}

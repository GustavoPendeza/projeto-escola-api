import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Enrollment from 'App/Models/Enrollment'

export default class EnrollmentSeeder extends BaseSeeder {
  public async run () {
    await Enrollment.createMany([
      {
        userId: 3,
        lessonId: 1
      },
      {
        userId: 3,
        lessonId: 5
      },
    ])
  }
}

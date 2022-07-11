import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Lesson from './Lesson'

export default class Enrollment extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public lessonId: number

  @belongsTo(() => Lesson)
  public lesson: BelongsTo<typeof Lesson>

  @column.dateTime({ autoCreate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value:DateTime) => value.toFormat("DD 'às' HH:mm:s") })
  public updatedAt: DateTime
}

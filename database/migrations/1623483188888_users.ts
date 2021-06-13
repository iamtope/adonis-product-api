import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 255).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).notNullable()
      table.enu('type', ['admin', 'user'])
      table.string('remember_me_token', 255)
      table.string('first_name', 255).notNullable()
      table.string('last_name', 255).notNullable()
      table.string('gender', 255).notNullable()
      table.string('contact_number', 255).notNullable()
      table.string('address', 255).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id', 10)
      table.integer('product_category_id', 10)
      table.integer('product_sub_category_id', 10)
      table.string('title', 250).notNullable()
      table.string('description', 255).notNullable()
      table.integer('price').notNullable()
      table.timestamps(true)

      table.foreign('user_id').references('id').inTable('users')
      table.foreign('product_category_id').references('id').inTable('product_categories')
      table.foreign('product_sub_category_id').references('id').inTable('product_sub_categories')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

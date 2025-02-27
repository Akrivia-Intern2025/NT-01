exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("user_id").primary();
    table.string("first_name").notNullable();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("email").notNullable().unique();
    table.string("profile_pic").nullable();
    table.string("thumbnail");
    table.string("branch").nullable();
    table.enum("status", ["0", "1", "2", "99"]).defaultTo("0");
    table.timestamps(true, true);
    table
      .integer("role_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE")
      .defaultTo(3);
    table.index(["email", "password"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
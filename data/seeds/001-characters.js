exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("characters")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("characters").insert([
        { id: 1, name: "Jon Snow" },
        { id: 2, name: "Arya Stark" },
        { id: 3, name: "Brandon Stark" }
      ]);
    });
};

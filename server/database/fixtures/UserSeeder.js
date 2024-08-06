const AbstractSeeder = require("./AbstractSeeder");

class UserSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "users", truncate: true });
  }

  run() {
    for (let i = 0; i < 10; i += 1) {
      const fakeUser = {
        first_name: this.faker.person.firstName(),
        last_name: this.faker.person.lastName(),
        email: this.faker.internet.email(),
        password: this.faker.internet.password(),
        role_id: 2,
        refName: `user_${i}`,
      };
      this.insert(fakeUser);
    }
  }
}
module.exports = UserSeeder;

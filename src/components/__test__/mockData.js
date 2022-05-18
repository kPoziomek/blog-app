export class User {
  constructor({ email, id, firstName, about, createdAt, lastName, updatedAt }) {
    this.email = email;
    this.id = id;
    this.firstName = firstName;
    this.about = about;
    this.createdAt = createdAt;
    this.lastName = lastName;
    this.updatedAt = updatedAt;
  }
}

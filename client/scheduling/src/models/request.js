export class Request {
  constructor(id, workerId, firstName, lastName, address, city, state, generator, time, notes) {
    this.id = id;
    this.workerId = workerId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.city = city;
    this.state = state;
    this.generator = generator;
    this.time = time;
    this.notes = notes;
  }
}
// class vehicle {
//   constructor(w) {
//     this.numwheels = w;
//   }
//   static run() {
//     // will be shared if any class extends vehicle class but not with parent's or child's object
//     console.log("running on " + this.numwheels);
//   }
//   gun() {
//     // will not be shared with either its instance or any class extending vehicle class
//     // but will be shared with object
//     console.log("gunnninnggg");
//   }
// }
// vehicle.prototype.acc = function () {
//   // will be shared with instance
//   console.log("accelerating....");
// };
// let c1 = new vehicle(5);
// c1.acc();
// c1.gun();

// class Jeep extends vehicle {
//   constructor(n) {
//     super(n);
//   }
//   thar() {
//     console.log("tharrrrrr");
//   }
// }
// let j1 = new Jeep(8);
// j1.gun();
// console.log(j1);
// j1.acc();

/// ---------------class vs prototype-------------

class Person {
  constructor(nm, id) {
    console.log("sdd");
    (this.name = nm), (this.id = id);
  }
  getDetails() {
    // all these functions are like prototype of function constructor
    return `${this.name + " " + this.id}`;
  }
}

class Employee extends Person {
  constructor(nm, id, salary) {
    console.log("1");
    super(nm, id);
    this.salary = salary;
    console.log("2");
  }

  EmpInfo() {
    return this.name + " " + this.id + " " + this.salary;
  }
}

let e1 = new Employee("aditya", 12, 20000);

console.log(e1.__proto__ == Person.prototype);
//--same with prototype

// function PersonP(nm, id) {
//   (this.name = nm), (this.id = id);
// }
// function EmployeeP(nm, id, salary) {
//   PersonP.call(this,nm,id)
//   this.salary = salary;
// }

// let pp1 = new Person("ritwika", 12);
// let ee1 = new Employee("Aditya", 10, 1000000);
// Object.setPrototypeOf(ee1, pp1);

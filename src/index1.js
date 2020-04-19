//var function scope
//let block scope
//const block scope, same as final in java

console.log("hola");

//objects, option 1 to use a function
//const person = { age: 25, name: "adrian", walk: function () {} };

//object, option 2 to use a function
//this always return the reference to the current object
const person = {
  name: "Adrian",
  walk() {
    console.log(this);
  },
  talk() {},
};

person.walk();
//why brackets because of the following
person["name"] = "John";

//check this out, for example a from string input
const targetMember = "name";
person[targetMember] = "John";

//standalone function this reference to the window object.
//walk();

const walk1 = person.talk;
console.log(walk1);

walk1();
console.log(walk1());

//binding this, this will be pointing to person, because is the first argument of bind
const talk = person.talk.bind(person);

//arrow functions
/** 
const square = function (number) {
  return number * number;
};
*/
// if there is only one parameter the parenthesis can be excluded
/** 
const square = (number) => {
  return number * number;
};
*/

//other way
const square = (number) => number * number;
//why is it useful
const jobs = [
  { id: 1, isActive: true },
  { id: 2, isActive: true },
  { id: 3, isActive: false },
];

//returns only jobs which isActive is true
/** 
const activeJobs = jobs.filter(function (job) {
  return job.isActive;
});
*/

//convert into arrow function
const activeJobs = jobs.filter((job) => job.isActive);
console.log(activeJobs);

//arrow functions and this; this gets reference to window object
/**
const person1 = {
  talk() {
    setTimeout(function () {
      console.log("this", this);
    }, 1000);
  },
};
 */
//other option is use self variable
/**
const person1 = {
    const self = this;
  talk() {
    setTimeout(function () {
      console.log("this", self);
    }, 1000);
  },
};
 */
//setTimeout is a standalone method not part of the talk object.
const person1 = {
  talk() {
    setTimeout(() => {
      console.log("this", this);
    }, 1000);
  },
};

person1.talk();

// arry .Map method
// transform each item on an array
//callback function recieves an item and returns a new item
const colors = ["red", "green", "blue"];
/** 
const items = colors.map(function (color) {
  return "<li>" + color + "</li>";
});
console.log("nuevos colores", items);
*/

//other way using template literals
const items = colors.map((color) => `<li>${color}</li>`);
console.log("nuevos colores", items);

// object destructuring
const address = {
  street: "calle 25",
  city: "",
  country: "",
};

const street = address.street;
const city = address.city;
const country = address.country;

//same as three previous lines
//const { street, city, country } = address;
//alias
const { street: st } = address;

console.log("street", st);

//spread operator
const first = [1, 2, 3];
const second = [4, 5, 6];

//old way
const combined = first.concat(second);

//using spread operator
const combinedSpread = [...first, ...second];

//adding an element in the middle
const combinedWithMore = [...first, "a", ...second, "cc"];

console.log(combinedWithMore);

//clone an array
const clone = [...first];

//spread operator on objects
const first1 = { name: "adrian" };
const second1 = { lastName: "otalora" };

const firstAndSecond = { ...first1, ...second1, location: "Colombia" };

console.log("objeto combinado", firstAndSecond);

//classes

class Persona {
  constructor(name) {
    this.name = name;
  }
  walk() {
    console.log("walk");
  }
}

const persona = new Persona("Adrian");

//inheritance
//parent constructor must be referenced
class Teacher extends Persona {
  constructor(name, degree) {
    super(name);
    this.degree = degree;
  }
  teach() {
    console.log("teach");
  }
}

const teacher = new Teacher("Adrian", "profesional");
teacher.teach();

//modules, multiple files per class, exmaple persona y teacher .js
//modules private by default
//public by exporting classes to the outside, preix export before the class keyword
//import {Person} from 'path to file' ex ./ means curent folder, ex ./persona

//named and default exports
//one or more objects from a given module can be exported, named export
//default exports all the class
//Default -> import ... from '';
//Named -> import {...} from '';
//./ only is used for own modules

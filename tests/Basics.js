class Person
{
    age = 32
    get location()
    {
        return "India"
    }
    constructor(firstName,lastName)
    {
        this.firstName = firstName,
        this.lastName = lastName

        console.log(`${firstName} and ${lastName}`);
    }
    fullName()
    {
        console.log(this.firstName+this.lastName); 
    }
}

let person = new Person("Joseph","Stalin")
let person2 = new Person("Sachin","Tendulkar")
console.log(person.age);
console.log(person.location);
console.log(person.fullName())
console.log(person2.fullName())
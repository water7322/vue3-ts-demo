function extend(ParentClass, SubClass) {
    SubClass.prototype = Object.create(ParentClass.prototype);
    SubClass.prototype.constructor = SubClass;
}
function People(age, sex) {
    this.age = age;
    this.sex = sex;
}
function Man(age, sex) {
    People.call(this, age, sex);
    this.man = 1;
}

extend(People, Man);

const man = new Man(18, 'male');
console.log(man.age, man.sex, man.man, man.constructor);

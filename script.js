class Employee {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
  }
}
class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.type = "Part-Time";
  }
  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52 - 1000;
  }
}
class Manager extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.type = "Manager";
    this.hours = hours;
  }
  calculatePay() {
    const weeklyHours = 40;
    this.annualSalary = this.payRate * weeklyHours * 52 - 1000;
  }
}
class Main {
  constructor() {
    this.employees = [];
    let employ1 = new PartTime("Josh", 25, 19, 29);
    employ1.calculatePay();
    let employ2 = new Manager("Steven", 30, 45, 40);
    employ2.calculatePay();
    let employ3 = new PartTime("Ariel", 27, 19, 24);
    employ3.calculatePay();
    this.employees.push(employ1, employ2, employ3);
    this.displayEmploy();
    this.menu();
  }
  menu() {
    let choices = "";
    while (choices != "5") {
      choices = prompt(
        "Please choose an option:\n" +
          "1. Add employee\n" +
          "2. Remove Employee\n" +
          "3. Edit Employee\n" +
          "4. display Employees\n" +
          "5. Exit"
      );
      if (choices === "1") {
        this.addingEmploy();
      } else if (choices === "2") {
        this.removeEmploy();
      } else if (choices === "3") {
        this.editingEmploy();
      } else if (choices === "4") {
        this.displayEmploy();
      } else if (choices === "5") {
        alert("Thank you come again");
      } else {
        alert("Not valid");
      }
    }
  }
  addingEmploy() {
    const input = prompt(
      "Enter employee info: name,age,Payrate, and hours. With commas"
    );
    const parts = input.split(",");
    const name = parts[0];
    const age = parseInt(parts[1]);
    const payRate = parseFloat(parts[2]);
    const hours = parseInt(parts[3]);
    let employ;
    if (hours < 40) {
      employ = new PartTime(name, age, payRate, hours);
    } else {
      employ = new Manager(name, age, payRate, hours);
    }
    employ.calculatePay();
    this.employees.push(employ);
    alert("Employee added");
    this.displayEmploy();
  }
  removeEmploy() {
    const input = prompt("enter employee number or name to remove:");
    if (isNaN(input)) {
      this.employees = this.employees.filter((e) => e.name !== input);
    } else {
      const indexNum = parseInt(input) - 1;
      if (indexNum >= 0 && indexNum < this.employees.length) {
        this.employees.splice(indexNum, 1);
      } else {
        alert("Invalid employee number");
      }
    }
    alert("Employee removed!");
    this.displayEmploy();
  }
  editingEmploy() {
    const nums =
      parseInt(prompt("enter employee number to edit pay rate:")) - 1;
    if (nums >= 0 && nums < this.employees.length) {
      const newPayRate = parseFloat(
        prompt("Enter the new pay rate for " + this.employees[nums].name + ":")
      );
      this.employees[nums].payRate = newPayRate;
      this.employees[nums].calculatePay();
      alert("Employee pay rate updated.");
      this.displayEmploy();
    } else {
      alert("invalid employee number");
    }
  }
  displayEmploy() {
    console.clear();
    console.log("Employee#\tName\tAge\tSalary\tHours\tPayRate\tType");
    this.employees.forEach((e, i) => {
      console.log(
        i +
          1 +
          "\t" +
          e.name +
          "\t" +
          e.age +
          "\t" +
          e.annualSalary +
          "\t" +
          (e.hours ?? "n/A") +
          "\t" +
          e.payRate +
          "\t" +
          e.type
      );
    });
  }
}
(() => {
  new Main();
})();

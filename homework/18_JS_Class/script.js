class Car {
  constructor(brand, model, year, color) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
  }

  getInfo() {
    return `Սա ${this.brand} ${this.model} է, ${this.color} գույնի, արտադրված ${this.year} թվականին`;
  }

  getAge() {
    return 2026 - this.year;
  }
}

const car1 = new Car("Toyota", "Camry", 2020, "Սև");
const car2 = new Car("BMW", "X5", 2018, "Սպիտակ");

const cars = [car1, car2];

cars.forEach(car => {
  console.log(car.getInfo());
  console.log(`Մեքենայի տարիքը՝ ${car.getAge()} տարի`);
});
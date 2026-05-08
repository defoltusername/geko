class Transport {
  constructor(aragutyun, maknish) {
    this.aragutyun = aragutyun;
    this.maknish = maknish;
  }
}

class Auto extends Transport {
  constructor(aragutyun, maknish, dziauj) {
    super(aragutyun, maknish);
    this.dziauj = dziauj;
  }

  info() {
    console.log(`${this.maknish} maknishi meqenan gnum e ${this.aragutyun} km/h aragutyamb ev uni ${this.dziauj} dziauj`);
  }
}

const transport = new Transport(130, "BMW");
const auto = new Auto(130, "BMW", 325);

auto.info();
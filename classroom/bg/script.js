class Fish {
  constructor(name, price) {
    this.name = name; 
  }

  getInfo() {
    return `${this.name} стоит ${this.price} руб.`;
  }
}
class FishMarket {
  constructor(marketName) {
    this.marketName = marketName;
    this.inventory = []; 
 
  addFish(fishObject) {
    this.inventory.push(fishObject);
    console.log(`${fishObject.name} привезен на рынок "${this.marketName}"`);
  }
    console.log(`--- Ассортимент рынка ${this.marketName} ---`);
    this.inventory.forEach(fish => {
      console.log(fish.getInfo());
    });
  }
}

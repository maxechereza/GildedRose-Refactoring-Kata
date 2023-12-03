export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQualityForAgedBrie(item) {
    if (item.quality < 50) {
      item.quality += 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality < 50) {
      item.quality += 1;
    }
  }
  
  updateQualityForBackstagePasses(item) {
    if (item.quality < 50) {
      item.quality += 1;
      if (item.sellIn < 11 && item.quality < 50) {
        item.quality += 1;
      }
      if (item.sellIn < 6 && item.quality < 50) {
        item.quality += 1;
      }
    }
    item.sellIn -= 1;
    if (item.sellIn < 0) {
      item.quality = 0;
    }
  }
  
  updateQualityForSulfuras(item) {
    // Quality and sellIn for 'Sulfuras' never changes
  }
  
  updateQualityForConjured(item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }
  }
  
  updateQualityForNormalItem(item) {
    if (item.quality > 0) {
      item.quality -= 1;
    }
    item.sellIn -= 1;
    if (item.sellIn < 0 && item.quality > 0) {
      item.quality -= 1;
    }
  }
  
  updateQuality() {
    for (let item of this.items) {
      switch (item.name) {
        case 'Aged Brie':
          this.updateQualityForAgedBrie(item);
          break;
        case 'Backstage passes to a TAFKAL80ETC concert':
          this.updateQualityForBackstagePasses(item);
          break;
        case 'Sulfuras, Hand of Ragnaros':
          this.updateQualityForSulfuras(item);
          break;
        case 'Conjured Mana Cake':
          this.updateQualityForConjured(item);
          break;
        default:
          this.updateQualityForNormalItem(item);
          break;
      }
    }
    return this.items;
  }
}

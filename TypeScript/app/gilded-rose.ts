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

export const AGED_BRIE = 'Aged Brie';
export const BACKSTAGE_PASSES = 'Backstage passes';
export const SULFURAS = 'Sulfuras';
export const CONJURED = 'Conjured';

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
      if (item.name.includes(AGED_BRIE)) {
        this.updateQualityForAgedBrie(item);
      } else if (item.name.includes(BACKSTAGE_PASSES)) {
        this.updateQualityForBackstagePasses(item);
      } else if (item.name.includes(SULFURAS)) {
        this.updateQualityForSulfuras(item);
      } else if (item.name.includes(CONJURED)) {
        this.updateQualityForConjured(item);
      } else {
        this.updateQualityForNormalItem(item);
      }
    }
    
    return this.items;
  }
}

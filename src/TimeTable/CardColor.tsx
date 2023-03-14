import React from 'react';
import { Lecture, lectureNone } from './Lecture';

export class CardColor {

  static colors = [
    "#FBE4EB", // 淡いピンク
    "#FEEAF2", // 薄いローズ
    "#FFF6E8", // 淡いオレンジ
    "#FFFDF5", // 淡いイエロー
    "#F5F5E6", // 淡いグリーン
    "#E8FBE8", // 淡いミントグリーン
    "#E2F2F2", // 淡いブルーグレー
    "#D8EAF0", // 淡いブルー
    "#ECE4F5", // 淡いラベンダー
    "#FBE5DF", // 淡いベージュ
    "#FBE8F2", // 淡いコーラル
    "#F0E5ED", // 淡いラズベリー
    "#D9D9D9", // 淡いグレー
    "#D8F5D8", // 淡いミント
    "#EBEBF5" // 淡いライラック
  ];

  private dict: { [key: string]: string } = {};

  constructor(lectures: Lecture[]) {
    for (let lec of lectures) {
      if (this.dict[lec.category] === undefined) {
        this.dict[lec.category] = CardColor.colors[Object.keys(this.dict).length];
      }
    }
  }

  getColor(category: string): string {
    return category === lectureNone.category ? "#FFFFFF" : this.dict[category];
  }
}
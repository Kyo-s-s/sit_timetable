import React from 'react';
import { Lecture, lectureNone } from './Lecture';

export class CardColor {

  static colors = [
    "#FBE4EB",
    "#FEEAF2",
    "#FFF6E8",
    "#FFFDF5",
    "#F5F5E6",
    "#E8FBE8",
    "#E2F2F2",
    "#D8EAF0",
    "#ECE4F5",
    "#FBE5DF",
    "#FBE8F2",
    "#F0E5ED",
    "#D9D9D9",
    "#D8F5D8",
    "#EBEBF5",
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
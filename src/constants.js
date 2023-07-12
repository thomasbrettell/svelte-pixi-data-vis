import * as PIXI from 'pixi.js';

const circle = new PIXI.Graphics();
circle.drawCircle(0, 0, 20);
export const circleGeometry = circle.geometry;
// circle.destroy();

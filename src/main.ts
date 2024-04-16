import "./style.css";
import { Inventory } from "./inventory";

let config = {
  parent: "app",
  autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  type: Phaser.CANVAS,
  width: 1280,
  height: 720,
  scene: [Inventory],
};

console.log("test");
export const game = new Phaser.Game(config);

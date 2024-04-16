import * as Phaser from "phaser";
import { game } from "./main";
import player from "./state/player.json";
import inventory from "./state/inventory.json";

const BUTTON_COLOR = 0xfbbd55;

class menuButton extends Phaser.GameObjects.Rectangle {
  label: Phaser.GameObjects.Text;
  constructor(
    scene: Phaser.Scene,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    text: string
  ) {
    super(scene, xPos, yPos, width, height, BUTTON_COLOR);
    this.label = new Phaser.GameObjects.Text(
      scene,
      xPos - text.length * 9.5,
      yPos - 16,
      text,
      {
        fontSize: "32px",
        color: "#000000",
      }
      );
      scene.add.existing(this)
      scene.add.existing(this.label)
  }
}

export class Inventory extends Phaser.Scene {
  gameWidth = game.config.width as number;
  gameHeight = game.config.height as number;
  preload() {}

  create() {
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xeeeeee
    );

    const abilitySlot1 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 - (2.25 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      player.abilities[0]
    );

    const abilitySlot2 = new menuButton(
        this,
        (this.gameWidth * 3) / 4,
        this.gameHeight / 2 - (0.75 * this.gameHeight) / 10,
        this.gameWidth / 5,
        this.gameHeight / 10,
        player.abilities[1]
      );

      const abilitySlot3 = new menuButton(
        this,
        (this.gameWidth * 3) / 4,
        this.gameHeight / 2 + (0.75 * this.gameHeight) / 10,
        this.gameWidth / 5,
        this.gameHeight / 10,
        player.abilities[2]
      );

      const abilitySlot4 = new menuButton(
        this,
        (this.gameWidth * 3) / 4,
        this.gameHeight / 2 + (2.25 * this.gameHeight) / 10,
        this.gameWidth / 5,
        this.gameHeight / 10,
        player.abilities[3]
      );
  }

  update() {}
}

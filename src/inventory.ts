import * as Phaser from "phaser";
import { game } from "./main";
import player from "./state/player.json";
import inventory from "./state/inventory.json";

const BUTTON_COLOR = 0xfbbd55;
const BUTTON_HL_COLOR = 0xffe6bb;

const ITEM_COLOR = 0x1be4ff;
const ITEM_HL_COLOR = 0xbbf7ff;

let selectState: "NONE" | "ABILITY" = "NONE";
let curSelection: "NONE" | "ABILITY1" | "ABILITY2" | "ABILITY3" | "ABILITY4" =
  "NONE";

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

    scene.add.existing(this);
    scene.add.existing(this.label);
    this.setInteractive();

    this.on("pointerover", () => {
      this.fillColor = BUTTON_HL_COLOR;
    });

    this.on("pointerout", () => {
      this.fillColor = BUTTON_COLOR;
    });
  }
}

class menuItem extends Phaser.GameObjects.Rectangle {
  label: Phaser.GameObjects.Text;
  constructor(
    scene: Phaser.Scene,
    xPos: number,
    yPos: number,
    width: number,
    height: number,
    text: string
  ) {
    super(scene, xPos, yPos, width, height, ITEM_COLOR);
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

    scene.add.existing(this);
    scene.add.existing(this.label);
    this.setInteractive();

    this.on("pointerover", () => {
      this.fillColor = ITEM_HL_COLOR;
    });

    this.on("pointerout", () => {
      this.fillColor = ITEM_COLOR;
    });
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

    this.displayAbilityInventory();
  }

  update() {}

  clearMenu(menu: menuItem[]) {
    for (const item of menu) {
      item.label.destroy();
      item.destroy();
    }
    return menu;
  }

  displayAbilityInventory() {
    let selectionMenu: menuItem[] = [];

    let yPos = this.gameHeight / 10;
    for (let i = 0; i < inventory.abilities.length; i++) {
      // Creates a new menuItem for all abilities not equipped to players
      if (!player.abilities.includes(inventory.abilities[i])) {
        const curItem = new menuItem(
          this,
          (this.gameWidth * 1) / 4,
          yPos,
          this.gameWidth / 5,
          this.gameHeight / 20,
          inventory.abilities[i]
        );

        // Destroys all menu item when anyone is clicked
        curItem.setInteractive();
        curItem.on("pointerdown", () => {
          selectionMenu = this.clearMenu(selectionMenu);
        });
        selectionMenu.push(curItem);

        yPos += (1.5 * this.gameHeight) / 20;
      }
    }

    const exitOption = new menuItem(
      this,
      (this.gameWidth * 1) / 4,
      yPos,
      this.gameWidth / 5,
      this.gameHeight / 20,
      "EXIT"
    );

    exitOption.setInteractive();
    exitOption.on("pointerdown", () => {
      selectionMenu = this.clearMenu(selectionMenu);
    });
    selectionMenu.push(exitOption);
  }
}

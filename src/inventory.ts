import * as Phaser from "phaser";
import { game } from "./main";
import player from "./state/player.json";
import inventory from "./state/inventory.json";
//const fs = require("fs")

const BUTTON_COLOR = 0xfbbd55;
const BUTTON_HL_COLOR = 0xffe6bb;

const ITEM_COLOR = 0x1be4ff;
const ITEM_HL_COLOR = 0xbbf7ff;

//let selectState: "NONE" | "ABILITY" = "NONE";
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

  centerText() {
    this.label.setX(this.x - this.label.text.length * 9.5);
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
  abilitySlot1: menuButton | null = null;
  abilitySlot2: menuButton | null = null;
  abilitySlot3: menuButton | null = null;
  abilitySlot4: menuButton | null = null;

  preload() {}

  create() {
    this.add.rectangle(
      this.gameWidth / 2,
      this.gameHeight / 2,
      this.gameWidth,
      this.gameHeight,
      0xeeeeee
    );

    this.abilitySlot1 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 - (2.25 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      player.abilities[0]
    );
    this.abilitySlot1.setInteractive();
    this.abilitySlot1.on("pointerdown", () => {
      this.selectSlot("ABILITY1");
    });

    this.abilitySlot2 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 - (0.75 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      player.abilities[1]
    );
    this.abilitySlot2.setInteractive();
    this.abilitySlot2.on("pointerdown", () => {
      this.selectSlot("ABILITY2");
    });

    this.abilitySlot3 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 + (0.75 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      player.abilities[2]
    );
    this.abilitySlot3.setInteractive();
    this.abilitySlot3.on("pointerdown", () => {
      this.selectSlot("ABILITY3");
    });

    this.abilitySlot4 = new menuButton(
      this,
      (this.gameWidth * 3) / 4,
      this.gameHeight / 2 + (2.25 * this.gameHeight) / 10,
      this.gameWidth / 5,
      this.gameHeight / 10,
      player.abilities[3]
    );
    this.abilitySlot4.setInteractive();
    this.abilitySlot4.on("pointerdown", () => {
      this.selectSlot("ABILITY4");
    });
  }

  update() {}

  savePlayerEquipment() {
    /*fs.writeFile("player.json", JSON.stringify(player.abilities), (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
        console.log("The written has the following contents:");
        console.log(fs.readFileSync("books.txt", "utf8"));
      }
    });*/
    return;
  }

  selectSlot(slot: "NONE" | "ABILITY1" | "ABILITY2" | "ABILITY3" | "ABILITY4") {
    if (curSelection == "NONE") {
      this.displayAbilityInventory();
    }
    curSelection = slot;
    console.log(curSelection);
  }

  swapEquipment(newItem: string) {
    let oldItem: string = "";
    let slotToModify: menuButton = this.abilitySlot1!;

    if (curSelection == "NONE") {
      return;
    } else if (curSelection == "ABILITY2") {
      slotToModify = this.abilitySlot2!;
    } else if (curSelection == "ABILITY3") {
      slotToModify = this.abilitySlot3!;
    } else if (curSelection == "ABILITY4") {
      slotToModify = this.abilitySlot4!;
    }

    oldItem = slotToModify.label.text;
    slotToModify.label.text = newItem;

    const equipKey = player.abilities.indexOf(oldItem);
    player.abilities[equipKey] = newItem;
    console.log(player.abilities);
    slotToModify.centerText();
    this.savePlayerEquipment();
  }

  clearMenu(menu: menuItem[]) {
    for (const item of menu) {
      item.label.destroy();
      item.destroy();
    }
    curSelection = "NONE";
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
          this.swapEquipment(curItem.label.text);
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

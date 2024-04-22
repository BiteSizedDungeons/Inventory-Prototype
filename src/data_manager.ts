const playerKey = "player";
const invKey = "inventory";

// Starting Player Loadout and Inventory
const startingLoadout = {
  abilities: ["heal", "quick strike", "weakening blow", "rampage"],
};

const startingInventory = {
  abilities: [
    "heal",
    "quick strike",
    "weakening blow",
    "rampage",
    "dual strikes",
    "empower",
    "armor pierce",
    "rest",
  ],
};

export interface BSD_Data {
  abilities: string[];
}

export function initializeSave() {
  localStorage.setItem(playerKey, JSON.stringify(startingLoadout));
  localStorage.setItem(invKey, JSON.stringify(startingInventory));
}

export function getPlayer(): BSD_Data {
  const player = localStorage.getItem(playerKey);
  return JSON.parse(player!);
}

export function getInventory(): BSD_Data {
  const inventory = localStorage.getItem(invKey);
  return JSON.parse(inventory!);
}

export function savePlayer(player: BSD_Data) {
  localStorage.setItem(playerKey, JSON.stringify(player));
}

export function saveInventory(inventory: BSD_Data) {
  localStorage.setItem(invKey, JSON.stringify(inventory));
}

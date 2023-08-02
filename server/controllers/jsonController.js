// @ts-nocheck
const spells = require("../dnd5eContent/5e-SRD-Spells.json");
const monsters = require("../dnd5eContent/srd_5e_monsters.json");
const feats = require('../dnd5eContent/05 feats.json')
const getFeats = (req, res) => {
  res.send(feats);
}
const getSpells = (req, res) => {
  res.send(spells);
};
const getMonsters = (req, res) => {
  res.send(monsters);
};
const searchSpells = (req, res) => {
  const { key, searchTerm } = req.body;
  let results = [];
  key.split(".");
  if (key.length > 1) {
    switch (key.length) {
      case 2:
        results = spells.filter((spell) =>
          spell[key[0]][key[1]].toLowerCase().includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 3:
        results = spells.filter((spell) =>
          spell[key[0]][key[1]][key[2]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 4:
        results = spells.filter((spell) =>
          spell[key[0]][key[1]][key[2]][key[3]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 5:
        results = spells.filter((spell) =>
          spell[key[0]][key[1]][key[2]][key[3]][key[4]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 6:
        results = spells.filter((spell) =>
          spell[key[0]][key[1]][key[2]][key[3]][key[4]][key[5]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      default:
        res.send("Too many keys");
        break;
    }
  } else {
    const results = spells.filter((spell) =>
      spell[key[0]].toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(results);
  }
};
const searchMonsters = (req, res) => {
  const { key, searchTerm } = req.body;
  let results = [];
  key.split(".");
  if (key.length > 1) {
    switch (key.length) {
      case 2:
        results = monsters.filter((monster) =>
          monster[key[0]][key[1]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 3:
        results = monsters.filter((monster) =>
          monster[key[0]][key[1]][key[2]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 4:
        results = monsters.filter((monster) =>
          monster[key[0]][key[1]][key[2]][key[3]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 5:
        results = monsters.filter((monster) =>
          monster[key[0]][key[1]][key[2]][key[3]][key[4]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      case 6:
        results = monsters.filter((monster) =>
          monster[key[0]][key[1]][key[2]][key[3]][key[4]][key[5]]
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        res.send(results);
        break;
      default:
        res.send("Too many keys");
        break;
    }
  } else {
    const results = monsters.filter((monster) =>
      monster[key[0]].toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.send(results);
  }
};
module.exports = {
  getSpells,
  getMonsters,
  getFeats,
  searchSpells,
  searchMonsters,
};

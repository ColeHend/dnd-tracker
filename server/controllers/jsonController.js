const spells = require('../5e-SRD-Spells.json');
const monsters = require('../srd_5e_monsters.json');
const getSpells = (req, res) => {
    res.send(spells);
    };
const getMonsters = (req, res) => {
    res.send(monsters);
    };

module.exports = {
    getSpells,
    getMonsters
    };

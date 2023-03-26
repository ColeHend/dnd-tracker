const spells = require('../5e-SRD-Spells.json');
const monsters = require('../srd_5e_monsters.json');
const getSpells = (req, res) => {
    res.send(spells);
    };
const getMonsters = (req, res) => {
    res.send(monsters);
    };
const searchSpells = (req, res) => {
    const {key, searchTerm} = req.body;
    const results = spells.filter(spell => spell[key].toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(results);
    };
const searchMonsters = (req, res) => {
    const {key, searchTerm} = req.body;
    const results = monsters.filter(monster => monster[key].toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(results);
    };
module.exports = {
    getSpells,
    getMonsters,
    searchSpells,
    searchMonsters
    };

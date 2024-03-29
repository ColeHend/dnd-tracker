import { objReturnString } from "../../../utilities/utilities";

export default class Spell {
    name: string;
    desc: string;
    // --------v--------
    subhead: string;
    school: string;
    level: string;
    components: string[];
    material: string;
    ritual: boolean;
    duration: string;
    concentration: boolean;
    casting_time: string;
    attack_type: string;
    classes: string[];
    constructor(name: string, desc: string, metadata: {
        subhead?: string, school?: string, level?: string, components?: string[], material?: string, ritual?: boolean, duration?: string, concentration?: boolean, casting_time?: string, attack_type?: string, classes?: string[]
    }) {
        this.name = name;
        this.desc = desc;
        // --------v--------
        this.subhead = metadata.subhead || "";
        this.school = metadata.school || "";
        this.level = metadata.level || "";
        this.components = metadata.components || [];
        this.material = metadata.material || "";
        this.ritual = metadata.ritual || false;
        this.duration = metadata.duration || "";
        this.concentration = metadata.concentration || false;
        this.casting_time = metadata.casting_time || "";
        this.attack_type = metadata.attack_type || "";
        this.classes = metadata.classes || [];
    }
    metadata() {
        return objReturnString({
            subhead: this.subhead,
            level: this.level,
            school: this.school,
            components: this.components,
            material: this.material,
            ritual: this.ritual,
            duration: this.duration,
            concentration: this.concentration,
            casting_time: this.casting_time,
            attack_type: this.attack_type,
            classes: this.classes
        })
    }
}
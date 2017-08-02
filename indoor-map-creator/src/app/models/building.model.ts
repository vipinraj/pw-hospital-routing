import { Feature } from "./feature.model";

export class Building extends Feature {
    building: string; // == hospital
    min_level: number;
    max_level: number;
    non_existent_levels: string;
    wheelchair: string;
    wheelchair_description_en: string;
    website: string;
    formControls = {
        "ref": 1,
        "ref_beacon": "",
        "note": "",
        "name": "",
        "building": "",
        "min_level": "",
        "max_level": "",
        "non_existent_levels": "",
        "wheelchair": "",
        "wheelchair_description_en": "",
        "website": ""
    };
    constructor() {
        super();
    }
}
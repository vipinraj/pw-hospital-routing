export class Project {
    projectId: string;
    name: string;
    centerLat: string;
    centerLong: string;
    zoomLevel: string;
    geoJson: {};
    geoJsonUrl: string;

    constructor(
        params: {
            projectId: string;
            name: string,
            centerLat?: string,
            centerLong?: string,
            zoomLevel?: string,
            geoJson?: {},
            geoJsonUrl?: string
        }) {
        this.projectId = params.projectId;
        this.name = params.name;
        this.centerLat = params.centerLat;
        this.centerLong = params.centerLong;
        this.zoomLevel = params.zoomLevel;
        this.geoJson = params.geoJson;
        this.geoJsonUrl = params.geoJsonUrl;
    }
}
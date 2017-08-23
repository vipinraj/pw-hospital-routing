import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';
import { Feature } from "../models/feature.model";
import { Project } from "../models/project.model";
import { environment } from '../../environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { FeatureService } from "../services/feature.service";
import { LevelFilterService } from "../services/level-filter.service";
declare var gapi: any;

@Injectable()
export class UserService {
    private loginToken: string;
    private currentUser: User;
    private projects: Project[];
    private activeProject: Project;
    private loginTokenObservable: BehaviorSubject<string> = new BehaviorSubject(null);
    private currentUserObservable: BehaviorSubject<User> = new BehaviorSubject(null);
    private projectsObservable: BehaviorSubject<Project[]> = new BehaviorSubject(null);
    private activeProjectObservable: BehaviorSubject<Project> = new BehaviorSubject(null);
    constructor(private http: Http, private featureService: FeatureService, private levelFilterService: LevelFilterService) { }
    get curentUserAsObsevable(): Observable<User> {
        return this.currentUserObservable.asObservable();
    }

    get projectsAsObsevable(): Observable<Project[]> {
        return this.projectsObservable.asObservable();
    }

    get activeProjectAsObservable(): Observable<Project> {
        return this.activeProjectObservable.asObservable();
    }
    get loginTokenAsObservable(): Observable<string> {
        return this.loginTokenObservable.asObservable();
    }

    setLoginToken(token: string) {
        this.loginToken = token;
        this.loginTokenObservable.next(token);
    }

    setUser(user: User) {
        this.currentUser = user;
        this.currentUserObservable.next(user);
    }

    setProjects(projects: Project[]) {
        this.projects = projects;
        this.projectsObservable.next(projects);
    }

    setActiveProject(project: Project) {
        if (this.activeProject) {
            this.projects.push(this.activeProject);
        }
        this.levelFilterService.clearCurrentLevels();
        this.featureService.clearCurrentFeatures();
        this.featureService.geoJsonToFeatureCollection(JSON.parse(project.geoJson), project.featureTypes);
        this.activeProject = project;
        this.activeProjectObservable.next(project);
        for (var index = 0; index < this.projects.length; index++) {
            if (this.projects[index].projectId == this.activeProject.projectId) {
                this.projects.splice(index, 1);
            }
        }
        this.projectsObservable.next(this.projects);
    }

    createProject(project: Project) {
        // create project
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.parse(JSON.stringify(project));
        body.token = this.loginToken;
        this.http.post(environment.apiBaseUrl + '/projects', body, options).subscribe((res: Response) => {
            var createdProject = res.json();
            project.projectId = createdProject._id;
            // fetch projects
            this.fetchProjects();
        });
    }

    // Get the user object from server, if new user, create user
    // and get.
    fetchUser(googleAccountId, email: string, callback) {
        // get the user from server
        this.http.request(environment.apiBaseUrl + '/users?token=' + this.loginToken)
            .subscribe((res: Response) => {
                var user = res.json();
                if (user) {
                    console.log(user);
                    // create user object
                    var userObj: User = new User({ userId: user._id, email: email, googleAccountId: user.userId });
                    this.setUser(userObj);
                    callback(null, true);
                } else {
                    // create user (for new users)
                    let headers = new Headers({ 'Content-Type': 'application/json' });
                    let options = new RequestOptions({ headers: headers });
                    this.http.post(environment.apiBaseUrl + '/users', {
                        token: this.loginToken
                    }, options).subscribe((res: Response) => {
                        var user = res.json();
                        console.log(user);
                        // create user object
                        var userObj: User = new User({ userId: user._id, email: email, googleAccountId: user.userId });
                        this.setUser(userObj);
                        callback(null, true);
                    });
                }
            });
    }

    fetchProjects() {
        // get projects from server
        var projectObjs: Project[] = [];
        this.http.request(environment.apiBaseUrl + '/users/' + this.currentUser.userId + '/projects/?token=' + this.loginToken)
            .subscribe((res: Response) => {
                var projects = res.json();
                if (projects) {
                    // create project objects
                    projects.forEach(project => {
                        if (!this.activeProject || this.activeProject.projectId != project._id) {
                            var projectObj = new Project(
                                {
                                    projectId: <string>project._id,
                                    name: <string>project.name,
                                    centerLat: project.centerLat ? <string>project.centerLat : null,
                                    centerLong: project.centerLong ? <string>project.centerLong : null,
                                    zoomLevel: project.zoomLevel ? <string>project.zoomLevel : null,
                                    geoJson: project.geoJson ? <string>project.geoJson : null,
                                    geoJsonUrl: project.geoJsonUrl ? <string>project.geoJsonUrl : null,
                                    featureTypes: project.featureTypes ? <string[]>project.featureTypes : null,
                                }
                            );
                            projectObjs.push(projectObj);
                        }
                    });
                    if (projectObjs.length > 0) {
                        this.setProjects(projectObjs);
                        console.log('project set');
                    } else
                        this.setProjects([]);
                } else {
                    console.error('No projects');
                    this.setProjects([]);
                }
            });
    }

    deleteProject(project: Project) {
        // delete project
        this.http.delete(environment.apiBaseUrl + '/projects/' + project.projectId + '?token=' + this.loginToken).subscribe((res: Response) => {
            var result = res.json();
            console.log(result);
            if (this.activeProject && this.activeProject.projectId == project.projectId) {
                this.activeProject = null;
                this.activeProjectObservable.next(this.activeProject);
            }
            // fetch projects
            this.fetchProjects();
        });
    }

    deleteUser() {
        this.http.delete(environment.apiBaseUrl + '/users?token=' + this.loginToken).subscribe((res: Response) => {
            var result = res.json();
            console.log(result);
            this.signOut();
            setTimeout(function() {
                location.reload();
            }, 200);
        });
    }

    // function to run after loging in
    signIn(googleUser, callback) {
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());
        localStorage.setItem('isLogined', 'true');
        localStorage.setItem('accountId', profile.getId());
        this.setLoginToken(googleUser.getAuthResponse().id_token);
        this.fetchUser(profile.getId(), profile.getEmail(), (err, result) => {
            if (!err) {
                this.fetchProjects();
                callback(null, true);
            } else {
                console.error('Error fetching user');
                callback(new Error('Error fetching user'), false);
            }
        });
    }

    signOut() {
        gapi.load('auth2', function () {
            gapi.auth2.init();
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.disconnect();
            auth2.signOut().then(function () {
                console.log('User signed out.');
                localStorage.removeItem('isLogined');
            });
        });
    }

    // convert GeoJSON to feature collection
    convertToFeatureCollection(geoJson) {
    }

    // update Project
    updateProject() {
        var result = this.featureService.convertToGeoJson();
        this.activeProject.geoJson = JSON.stringify(result.geoJson);
        this.activeProject.featureTypes = result.featureTypes;
        // create project
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.parse(JSON.stringify(this.activeProject));
        body.token = this.loginToken;
        this.http.put(environment.apiBaseUrl + '/projects/' + this.activeProject.projectId, body, options).subscribe((res: Response) => {
            console.log('project updated');
            console.log(res.json());
            var project = res.json();
            // create object of updated project
            var projectObj = new Project(
                {
                    projectId: <string>project._id,
                    name: <string>project.name,
                    centerLat: project.centerLat ? <string>project.centerLat : null,
                    centerLong: project.centerLong ? <string>project.centerLong : null,
                    zoomLevel: project.zoomLevel ? <string>project.zoomLevel : null,
                    geoJson: project.geoJson ? <string>project.geoJson : null,
                    geoJsonUrl: project.geoJsonUrl ? <string>project.geoJsonUrl : null,
                    featureTypes: project.featureTypes ? <string[]>project.featureTypes : null,
                }
            );
            this.setActiveProject(projectObj);
        });
    }

    setZoomAndCenter(lat, long, zoomLevel) {
        this.activeProject.centerLat = lat;
        this.activeProject.centerLong = long;
        this.activeProject.zoomLevel = zoomLevel;
    }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user.model';
import { Feature } from "../models/feature.model";
import { Project } from "../models/project.model";

@Injectable()
export class UserService {

    private currentUser: User;
    private projects: Project[];
    private activeProject: Project;
    private currentUserObservable: BehaviorSubject<User> = new BehaviorSubject(null);
    private projectsObservable: BehaviorSubject<Project[]> = new BehaviorSubject(null);
    private activeProjectObservable: BehaviorSubject<Project> = new BehaviorSubject(null);

    get curentUserAsObsevable(): Observable<User> {
        return this.currentUserObservable.asObservable();
    }

    get curentProjectsAsObsevable(): Observable<Project[]> {
        return this.projectsObservable.asObservable();
    }

    get activeProjectAsObservable(): Observable<Project> {
        return this.activeProjectObservable.asObservable();
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
        this.activeProject = project;
        this.activeProjectObservable.next(project);
    }

    saveProjectToServer() {
        
    }
}

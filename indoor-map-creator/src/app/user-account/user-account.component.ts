import { Component, OnInit, OnDestroy } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit, OnDestroy {
  currentUser: User;
  projects: Project[];
  activeProject: Project;
  private subscriptions: Array<Subscription> = [];

  constructor(public dialogRef: MdDialogRef<UserAccountComponent>, private userService: UserService, public dialog: MdDialog) {
    this.subscriptions.push(userService.curentUserAsObsevable.subscribe((user) => {
      this.currentUser = user;
      console.log(user);
    }));
    this.subscriptions.push(userService.projectsAsObsevable.subscribe((projects) => {
      this.projects = projects;
      console.log(projects);
    }));
    this.subscriptions.push(userService.activeProjectAsObservable.subscribe((project) => {
      this.activeProject = project;
      console.log(project);
    }));
  }

  ngOnInit() {
  }

  createProject() {
    this.dialog.open(CreateProjectDialogComponent, { width: '350px', height: '400px' });
  };

  deleteProject(project: Project) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { message: 'Are you sure you want to delete<br/> this project permanently ?' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        console.log(project);
        this.userService.deleteProject(project);
      }
    });
  }

  changeActiveProject(project: Project) {
    if (this.activeProject) {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { message: 'Unsaved changes of active project will<br/>be lost, sure to continue ?' } });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'yes') {
          this.userService.setActiveProject(project);
        }
      });
    } else {
      this.userService.setActiveProject(project);
    }
  }

  deleteUser() {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: { message: 'Are you sure you want to delete<br/> your account and projects permanently ?' } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'yes') {
        this.userService.deleteUser();
      }
    });
  }

  public ngOnDestroy(): void {
    console.log('Destroying');
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}


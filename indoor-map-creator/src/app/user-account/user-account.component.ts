import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { CreateProjectDialogComponent } from '../create-project-dialog/create-project-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  currentUser: User;
  projects: Project[];
  activeProject: Project;
  constructor(public dialogRef: MdDialogRef<UserAccountComponent>, private userService: UserService, public dialog: MdDialog) {
    userService.curentUserAsObsevable.subscribe((user) => {
      this.currentUser = user;
      console.log(user);
    });
    userService.projectsAsObsevable.subscribe((projects) => {
      this.projects = projects;
      console.log(projects);
    });
    userService.activeProjectAsObservable.subscribe((project) => {
      this.activeProject = project;
      console.log(project);
    });
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
}


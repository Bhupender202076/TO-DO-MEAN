import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  //task[
  //{title"code for angular module 1",description:"complete the module"}
  //{title"code for angular module 2",description:"complete the module"}
  // {title"code for angular module 3",description:"complete the module"}
  //];
  @Input() storedTasks: Task[] = [];
  isLoading = false;

  totalTasks = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: any = [1, 5, 10, 100];
  userId = null;

  private tasksSub: Subscription;
  public userIsAuthenticated = false;
 private authListenerSubs: Subscription;

  constructor(
    public tasksService: TaskService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.tasksService.getTasks(this.pageSize, this.pageIndex);
    this.isLoading = true;

    this.tasksSub = this.tasksService
      .getTaskUpdateLister()
      .subscribe((taskData: any) => {
        this.isLoading = false;
        console.log(taskData);

        this.storedTasks = taskData.tasks;
        this.totalTasks = taskData.totalCount;
      });

    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangePage(event: PageEvent) {
    console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.tasksService.getTasks(this.pageSize, this.pageIndex);
  }
  onDelete(id: any) {
    this.tasksService.deleteTask(id).subscribe((r) => {
      this.tasksService.getTasks(this.pageSize, this.pageIndex);
    });
  }
  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}

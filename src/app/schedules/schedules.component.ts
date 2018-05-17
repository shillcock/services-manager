import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { SchedulesService } from '@app/core';
import { ISchedule } from '@app/core/models';
import { MODIFY_ACTIONS } from '@app/shared/consts';

import { ScheduleEditDialog } from './schedule-edit-dialog.component';

@Component({
  selector: 'sm-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})
export class SchedulesComponent implements OnInit {
    
  schedulesMap: any;
  schedules: ISchedule[];
  processing: boolean = true;
  
  private subscription: Subscription;
  
  constructor(private ss: SchedulesService, private dialog: MatDialog) { }
    
  ngOnInit() {
    this.fetchSchedules();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private fetchSchedules(): void {
    this.processing = true;
    this.subscription = this.ss.schedules$      
      .subscribe(schedulesMap => { 
        this.populateMemberFields(schedulesMap);
        this.processing = false;
      }, err => { this.processing = false; });
  }
  
  onAdd(): void {
    const dialogConfig = this.createDialogConfig(
      'Add Schedule', 
      MODIFY_ACTIONS.add, 
      {
        cron: '',
        allowOverlap: false,
        id: '',
        serviceId: '',        
        parameters: {},
        command: '',
      },
      Object.assign({}, this.schedulesMap)
    );    
    this.openEditDialog(dialogConfig);
  }
  
  onEdit(schedule: ISchedule): void {     
    const dialogConfig = this.createDialogConfig(
      'Edit ' + schedule.id, 
      MODIFY_ACTIONS.edit, 
      Object.assign({}, schedule),
      Object.assign({}, this.schedulesMap)
    );    
    this.openEditDialog(dialogConfig);    
  }
  
  onDelete(schedule: ISchedule): void { 
    const dialogConfig = this.createDialogConfig(
      'Delete ' + schedule.id, 
      MODIFY_ACTIONS.delete, 
      Object.assign({}, schedule),
      Object.assign({}, this.schedulesMap)
    );    
    this.openEditDialog(dialogConfig);  
  }
  
  private populateMemberFields(schedulesMap: any) {
    if (schedulesMap) {
      this.schedulesMap = schedulesMap;
      this.schedules = Object.values(schedulesMap);
    }
  }
  
  private createDialogConfig(title: string, action: string, editSchedule: ISchedule, editSchedulesMap: any) {
    const configTemplate = {
      disableClose: true,
      minWidth: 500,
      data: { }
    };
    
    return Object
      .assign({}, 
        configTemplate, 
        {data: {
          title: title,
          action: action, 
          editSchedule: editSchedule,
          editSchedulesMap: editSchedulesMap
         }}
      );
  }
  
  private openEditDialog(dialogConfig: any): void {
    const dialogRef = this.dialog.open(ScheduleEditDialog, dialogConfig);
    dialogRef
      .afterClosed()
      .subscribe(res => {        
        console.log('DIALOG CLOSED:', res);
        this.populateMemberFields(res);
      });
  }
  
 }

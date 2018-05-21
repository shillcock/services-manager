import { Component, OnInit, AfterViewInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subscription } from 'rxjs/Subscription';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { ISchedule } from '@app/core/models';
import { SchedulesService } from '@app/core';

import { MODIFY_ACTIONS } from '@app/shared/consts';

const DEFAULT_ACTION_BUTTON_TEXT: string = "SAVE";
const DEFAULT_ACTION_BUTTON_COLOR: string = "primary";
const DELETE_ACTION_BUTTON_TEXT: string = "DELETE";
const DELETE_ACTION_BUTTON_COLOR: string = "warn";

export interface IValidationResult {
  schedule?: ISchedule;
  valid: boolean;
  errorMessage: string;
}

@Component({
  selector: 'sm-schedule-edit-dialog',
  template: `
<div class="edit-dialog">
  <h1 mat-dialog-title>{{data.title}}</h1>
  <mat-dialog-content>
    <mat-divider></mat-divider>  
    <pre *ngIf="readOnly" class="readonly">{{editScheduleString}}</pre>  
    <pre *ngIf="!readOnly" #editInput [ngClass]="{'invalid': !inputValid}" contenteditable [(sm-contenteditable-model)]="editScheduleString"></pre> 
    <span *ngIf="errorMessage.length" class="error">{{errorMessage}}</span>
  </mat-dialog-content>
  <mat-dialog-actions>    
    <span class="spacer"></span>
    <ng-container *ngIf="!saving; else processing">
      <button mat-button [color]="actionButtonColor" [disabled]="!inputValid" (click)="onSave()">{{actionButtonText}}</button>
      <button mat-button (click)="onCancel()">CANCEL</button> 
    </ng-container>
  </mat-dialog-actions>  
  
  <ng-template #processing>
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
  </ng-template>
</div>
  `,
  styles: [
    `
mat-dialog-content {
 font-size: 14px; 
}
.error {
 color: #f44336; 
}
.invalid {
  outline-color: #f44336; 
}
.readonly {
  background-color: #eee;
}
  `
  ]
})
export class ScheduleEditDialog implements OnInit, AfterViewInit, OnDestroy {
   
  @ViewChild('editInput') editInput: any;
  
  private subscription: Subscription;
  
  actionButtonText: string = DEFAULT_ACTION_BUTTON_TEXT;
  actionButtonColor: string = DEFAULT_ACTION_BUTTON_COLOR;
  readOnly: boolean = false;
  editScheduleId: string;
  editScheduleString: string;
  inputValid: boolean = false;
  saving: boolean = false;
  errorMessage: string = '';
     
  constructor(
    private ss: SchedulesService,
    public dialogRef: MatDialogRef<ScheduleEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  
  ngOnInit(): void {
    this.editScheduleId = this.data.editSchedule.id;
    this.editScheduleString = JSON.stringify(this.data.editSchedule, null, 2);
    
    let validationResult: IValidationResult = this.validateSchedule(this.editScheduleString);
    this.errorMessage = validationResult.errorMessage
    this.inputValid = validationResult.valid;
    this.updateDefaults();    
  }
  
  ngAfterViewInit(): void {
    if (this.data.action != MODIFY_ACTIONS.delete) {
      const x = fromEvent(this.editInput.nativeElement, 'input').pipe(
        map((e: any) => e.target.innerText),
        filter(text => text.length >= 2),
        debounceTime(10),
        distinctUntilChanged()            
      ); 
      
      this.subscription = x.subscribe(text => {
        let validationResult: IValidationResult = this.validateSchedule(text);
        if (validationResult.valid) {
            this.inputValid = true;
            this.errorMessage = '';
          } else {
            this.inputValid = false;
            this.errorMessage = validationResult.errorMessage;
          }
        });
    }
  }
    
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
    
  private updateDefaults() {
    if (this.data.action === MODIFY_ACTIONS.delete) { 
      this.actionButtonText = DELETE_ACTION_BUTTON_TEXT;
      this.actionButtonColor = DELETE_ACTION_BUTTON_COLOR;
      this.readOnly = true;
    } else {
      this.actionButtonText = DEFAULT_ACTION_BUTTON_TEXT;
      this.actionButtonColor = DEFAULT_ACTION_BUTTON_COLOR;
      this.readOnly = false;
    }
  }    
    
  onSave() {  
    let validationResult: IValidationResult = this.validateSchedule(this.editScheduleString);
    this.errorMessage = '';
    
    if (undefined != validationResult.schedule) {
      this.readOnly = true;
      this.saving = true;
      this.ss.upsertSchedules(this.buildSchedulesMapForSave(this.data.editSchedulesMap, validationResult.schedule))
        .subscribe((schedulesMap: any) => this.dialogRef.close(schedulesMap),
          err => {
           this.saving = false; 
           this.errorMessage = 'Request failed';        
           this.updateDefaults();
           } 
         );
    } else {
     this.errorMessage = validationResult.errorMessage
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();  
  }   
  
  private getJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch(err) {
      return null; 
    } 
  }
  
  private validateSchedule(jsonString: string): IValidationResult {
    let schedule = this.getJSON(jsonString);
    
    if (null == schedule) { return {schedule: undefined, valid: false, errorMessage: "Invalid JSON"}; }
    if (!this.validateIdLength(schedule)) { return {schedule: undefined, valid: false, errorMessage: "Invalid Id: Id must not be blank"}; }
    if (!this.validateIdUnique(schedule)) { return {schedule: undefined, valid: false, errorMessage: "Invalid Id: Id already exists"}; }
        
    return {schedule: schedule, valid: true, errorMessage: ""};
  }  
  
  private validateIdLength(schedule: any): boolean {
    return (schedule['id'] && schedule['id'].length > 0);
  }
  
  private validateIdUnique(schedule: any): boolean {
    return ((schedule['id'] === this.editScheduleId) || (Object.keys(this.data.editSchedulesMap).indexOf(schedule['id']) === -1)); 
  }
  
  private buildSchedulesMapForSave(editSchedulesMap: any, schedule: ISchedule): any {
    let schedulesMap: any = Object.assign({}, editSchedulesMap);
    
    switch(this.data.action) {
     case (MODIFY_ACTIONS.add):
        schedulesMap[schedule.id] = schedule; 
        break;      
     case (MODIFY_ACTIONS.edit):
        delete schedulesMap[this.editScheduleId];
        schedulesMap[schedule.id] = schedule; 
        break;
     case (MODIFY_ACTIONS.delete):
        delete schedulesMap[schedule.id];
        break;
     default:
    }
    
    return schedulesMap;    
  }
}

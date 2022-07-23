import { Component, Input, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataModel } from 'src/app/models/DataModel';

@Component({
  selector: 'app-subject-child',
  templateUrl: './subject-child.component.html',
  styleUrls: ['./subject-child.component.scss']
})
export class SubjectChildComponent implements OnInit {
  @Input() subject!: Subject<DataModel>
  @Input() name!: string

  log: string[] = []
  connected: boolean = false
  subscription!: Subscription

  constructor() { }

  ngOnInit(): void {
  }

  logData(data: DataModel): void {
    this.log.push(`TimeStamp: ${data.timeStamp} - Data: ${data.data}`)
  }

  connect(): void {
    this.log.push('Connected!')
    this.connected = true
    this.subscription = this.subject.subscribe({
        next: (data: DataModel) => {
          this.logData(data)
        },
        error: (error) => this.connected = false,
        complete: () => {
          this.connected = false
          this.log.push('Finished!')
        }
      } 
    )
  }

  disconnect(): void {
    this.subscription.unsubscribe()
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-cold-observables',
  templateUrl: './cold-observables.component.html',
  styleUrls: ['./cold-observables.component.scss']
})
export class ColdObservablesComponent implements OnInit {
  
  subscription1!: Subscription
  subscription2!: Subscription

  n1: number = 0
  n2!: number
  s1: string = 'Initializing...:'
  s2: string = ''

  constructor() { }

  ngOnInit(): void {
    const myFirstObservable = new Observable(
      (observer: Observer<number>) => {
        observer.next(1)
        observer.next(2)
        observer.next(3)
        observer.next(4)
        observer.next(5)
        observer.error('Error here')
        observer.complete()
      }
    )
    myFirstObservable.subscribe(
      (n: number) => console.log(n),
      (error) => console.log(error),
      () => console.log('completed')
    )

    const myIntervalObservable = new Observable(
      (observer: Observer<any>) => {
        let i: number = 0
        let interval = setInterval(() => {
          i++
          console.log(`from Observable: ${i}`)
          if(i == 10) observer.complete()
          else if(i % 2 == 0) observer.next(i)
        }, 1000)
        return () => {
          clearInterval(interval)
        }
      }
    )

      this.subscription1 = myIntervalObservable.subscribe(
        (_n) => this.n1 = _n,
        (error) => this.s1 = `Error: ${this.s1 = error}`,
        () => this.s1 = 'Completed'
      )

      setTimeout(() => {
        this.subscription1.unsubscribe()
      }, 11000)
   
  }
}

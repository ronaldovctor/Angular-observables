import { Component, OnInit } from '@angular/core';
import { connect, connectable, Observable, Observer, publish, refCount, share, Subject, using } from 'rxjs';

@Component({
  selector: 'app-hot-observables2',
  templateUrl: './hot-observables2.component.html',
  styleUrls: ['./hot-observables2.component.scss']
})
export class HotObservables2Component implements OnInit {
  n1: number = 0
  n2: number = 0
  s1: string = ''
  s2: string = ''

  myObservable!: Observable<number>

  constructor() {

  }

  ngOnInit(): void {
    this.myObservable = new Observable(
      (observer: Observer<number>) => {
        let i: number = 0
        console.log('%c Observable Created ', 'background: #ccc; color: #ff0000')
        setInterval(() => {
          i++
          console.log(`%c Value of 'i': ${i} `, 'background: #ccc; color: #0000FF')
          i === 100  ? observer.complete() : observer.next(i)
        }, 1000)
      }
    )
    //this.usingSubjects()
    //this.usingPublish()
    this.usingShare()
  }

  usingShare(){
    //const multicasted = this.myObservable.pipe(share())
    const multicasted = this.myObservable.pipe(share())

    //Subscriber 1
    this.s1 = 'waiting for interval ...'
    setTimeout(() => {
      multicasted.subscribe((n: number)=> {
        this.n1 = n
        this.s1 = 'OK'
      })
    }, 2000)

    //Subscriber 2
    this.s2 = 'waiting for interval ...'
    setTimeout(() => {
      multicasted.subscribe((n: number)=> {
        this.n2 = n
        this.s2 = 'OK'
      })
    }, 4000)
  }

  usingPublish(){
    //const multicasted = this.myObservable.pipe(share())
    const multicasted = connectable<number>(this.myObservable)
    multicasted.connect()

    //Subscriber 1
    this.s1 = 'waiting for interval ...'
    setTimeout(() => {
      multicasted.subscribe((n: number)=> {
        this.n1 = n
        this.s1 = 'OK'
      })
    }, 2000)

    //Subscriber 2
    this.s2 = 'waiting for interval ...'
    setTimeout(() => {
      multicasted.subscribe((n: number)=> {
        this.n2 = n
        this.s2 = 'OK'
      })
    }, 4000)
  }

  usingSubjects(): void {
    const subject = new Subject<number>()
    this.myObservable.subscribe(subject)

    //Subscriber 1
    this.s1 = 'waiting for interval ...'
    setTimeout(() => {
      subject.subscribe((n: number)=> {
        this.n1 = n
        this.s1 = 'OK'
      })
    }, 2000)

    //Subscriber 2
    this.s2 = 'waiting for interval ...'
    setTimeout(() => {
      subject.subscribe((n: number)=> {
        this.n2 = n
        this.s2 = 'OK'
      })
    }, 4000)
  }

}

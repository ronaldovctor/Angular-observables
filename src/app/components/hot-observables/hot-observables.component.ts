import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-hot-observables',
  templateUrl: './hot-observables.component.html',
  styleUrls: ['./hot-observables.component.scss']
})
export class HotObservablesComponent implements OnInit {
  @ViewChild('myButton') button!: ElementRef<HTMLButtonElement>

  n1: number = 0
  n2: number = 0
  s1: string = ''
  s2: string = ''

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    let myBtnClickObservable: Observable<any> = fromEvent(
      this.button.nativeElement, 'click'
    )
    myBtnClickObservable.subscribe((event) => console.log('button clicked 1'))

    class Producer {
      private _myListeners: any = []
      private _n = 0
      private _interval: any

      addListener(l:any): void{
        this._myListeners.push(l)
      }

      start() {
        this._interval = setInterval(() => {
          this._n++
          console.log(`From Producer: ${this._n}`)
          for(let l of this._myListeners){
            l(this._n)
          }
        }, 1000)
      }

      stop(){
        clearInterval(this._interval)
      }
    }

    let producer: Producer = new Producer()
    producer.start()
    setTimeout(()=> {
      producer.addListener((n: number) => console.log(`From listener 1: ${n} x 2 = ${n*2}`))
      producer.addListener((n: number) => console.log(`From listener 2: ${n} x ${n} = ${Math.pow(n,2)}`))
    }, 3000)

    const myHotObservable: Observable<any> = new Observable(
      (observe: Observer<number>) => {
        producer.addListener((n:number) => observe.next(n))
      }
    )
    myHotObservable.subscribe((n)=> console.log(`From Subscribe 1: ${n}`))
  }

}

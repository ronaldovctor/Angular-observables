import { Injectable } from '@angular/core';
import { connect, connectable, Connectable, Observable, Observer, share } from 'rxjs';
import { DataModel } from '../models/DataModel';

@Injectable({
  providedIn: 'root'
})
export class GenRandomDataService {
  public dataObservable!: Connectable<DataModel>

  constructor() { 
    this.dataObservable = connectable(new Observable(
      (observer: Observer<DataModel>) => {
        let n = 0
        console.log('Observable created...')
        let f = ()=> {
          n++
          console.log(n)
          if(n <= 10){
            let timeStamp = Math.round(Math.random() * 2000 + 500)
            observer.next({timeStamp: timeStamp, data: n})
            setTimeout(f, timeStamp)
          }
          else{
            observer.complete()
          }
        }
        f()
      }
    ))
  }
}

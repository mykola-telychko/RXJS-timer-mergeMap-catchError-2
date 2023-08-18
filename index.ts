import { timer, from, of } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

//create promise that immediately rejects
const badPromise = () => new Promise((resolve, reject) => reject('Rejected!'));

const goodPromise = () => new Promise((resolve, reject) => resolve('Resolve!'));
//emit single value after 1 second
const src_1$ = timer(1000);
const src_2$ = timer(3000);

//catch rejected promise, returning observable containing error message
const exmpl_1 = src_1$.pipe(
  mergeMap((_) =>
    from(badPromise()).pipe(catchError((error) => of(`Bad Promise: ${error}`)))
  )
);

const exmpl_2 = src_2$.pipe(
  mergeMap((_) =>
    from(goodPromise()).pipe(catchError((error) => of(`Bad Promise: ${error}`)))
  )
);
//output: 'Bad Promise: Rejected'
const subscribe = exmpl_1.subscribe((val) => console.log(val)); // Bad Promise: Rejected!
const sub2 = exmpl_2.subscribe((val) => console.log(val)); // Resolve

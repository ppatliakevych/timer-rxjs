import React, { useState } from 'react';
import { interval, fromEvent, merge, empty, of} from 'rxjs';
import { switchMap, scan, mapTo, takeWhile } from 'rxjs/operators';
import './timer.css'

export function Timer() {
    const [time, setTime] = useState<number>(0);

    // DOM elements
    const startButton = document.getElementById('startBtn')! as HTMLButtonElement;
    const pauseButton = document.getElementById('pauseBtn')! as HTMLButtonElement;
    const resetButton = document.getElementById('resetBtn')! as HTMLButtonElement;
    
    // streams from events
    const pause$ = fromEvent(pauseButton, 'click').pipe(mapTo(false));
    const start$ = fromEvent(startButton, 'click').pipe(mapTo(true));
    const reset$ = fromEvent(resetButton, 'click').pipe(mapTo(null));
    
    // interval
    const interval$ = interval(1000).pipe(mapTo(-1));
    // timer
    const timer$ = merge(pause$, start$, reset$).pipe(
        switchMap((isRunning: boolean | null) => {
            if (isRunning === null) return of(null);
            return isRunning ? interval$ : empty()
        }),
        scan((acc: number, curr: number | null) => {
            if (curr === null) return -1;
            return curr ? curr + acc : acc
        }, time),
        takeWhile((currentTime: number) => currentTime >= 0)
    ).subscribe((val: number) => setTime(val),
        (error: any) => null,
       () => { 
           setTime(0);
       });

    function changeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        const timeValue = +event.target.value > 0 ? +event.target.value : 0;
        setTime(timeValue);
    }

    return (
        <div className="timer-component">
            <h1>Timer</h1>
            <p>{time} seconds remains</p>
            <div className="user-input">
                <label htmlFor="userNumber">Enter a number</label>
                <input type="number" id="userNumber" onChange={changeHandler} value={time} />
            </div>
            <div className="row">
                <button id="startBtn">Start</button>
                <button id="pauseBtn">Pause</button>
                <button id="resetBtn">Reset</button>
            </div>
        </div>
    );
}
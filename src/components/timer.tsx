import React, { useState } from 'react';
import { getStopWatch } from './stopwatch';
import { Subscription } from 'rxjs';
import { Speed } from './speed.enum';

interface TimerProps {
    time: number,
    speed: Speed,
    onSetTime: (value: number) => void
}

export function Timer(props: TimerProps) {
    const [subscription, setSubscription] = useState<Subscription>();

    function startHandler(): void {
        setSubscription(getStopWatch(props.time, props.speed).subscribe((current: number) => props.onSetTime(current)));
    }

    function pauseHandler(): void {
        subscription!.unsubscribe();
    }

    function resetHandler(): void {
        if (subscription) {
            subscription!.unsubscribe()
        }
        props.onSetTime(0)
    }

    return (
        <div className="row">
            <button id="startBtn" onClick={startHandler}>Start</button>
            <button id="pauseBtn" onClick={pauseHandler}>Pause</button>
            <button id="resetBtn" onClick={resetHandler}>Reset</button>
        </div>
    );
}
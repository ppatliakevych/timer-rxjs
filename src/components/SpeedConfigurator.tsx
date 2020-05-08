import React from 'react';
import { Speed } from "./speed.enum";

interface SpeedConfuratorProps {
    setSpeed: (value: Speed) => void
}

export function SpeedConfurator(props: SpeedConfuratorProps) {

    return (
        <div className="row">
            <button onClick={() => props.setSpeed(Speed.ONE)}>1x</button>
            <button onClick={() => props.setSpeed(Speed.ONE_AND_HALF)}>1.5x</button>
            <button onClick={() => props.setSpeed(Speed.TWO)}>2x</button>
        </div>
    )
}
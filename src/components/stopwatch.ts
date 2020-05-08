import { map } from 'rxjs/operators';
import { Speed } from './speed.enum';
import { Observable, interval } from 'rxjs';

export function getStopWatch(currentTime = 0, swInterval = Speed.ONE): Observable<number> {
    return interval(swInterval).pipe(
        map((currentValue: number) => currentTime + currentValue));
}
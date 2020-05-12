import { Observable, timer, Subscription, defer, BehaviorSubject } from "rxjs";
import { share, finalize } from "rxjs/operators";

type RegistryItem = {
    timerSub: Subscription,
    timeToLiveMS: BehaviorSubject<number>,
    cache: Observable<number> | null
}
const registry = new Map<string, RegistryItem>();

function emulateRequest$(timeToLiveMS: number): Observable<number> {
    return timer(timeToLiveMS);
}

function updateObservableTime(newTimeToLiveMS: number, registryHash: string): void {

    const dataSourceItem = registry.get(registryHash)!;

    dataSourceItem.timeToLiveMS.next(newTimeToLiveMS);
}

function getDataSource$(config: string): RegistryItem {

    if (!registry.has(config)) {

        const source: RegistryItem = {
            timerSub: new Subscription(),
            timeToLiveMS: new BehaviorSubject<number>(1000),
            cache: null
        }

        source.timeToLiveMS.subscribe((timeMS:number) => {
            source.cache = defer(() => {
                source.timerSub.unsubscribe();
                return emulateRequest$(timeMS);
            }).pipe(finalize(() => {
                source.timerSub = timer(1000, 5000).subscribe(() => {
                    source.timeToLiveMS.unsubscribe();
                    registry.delete(config);
                })
            }), share());
        });
        registry.set(config, source);
    }
    return registry.get(config)!;
}

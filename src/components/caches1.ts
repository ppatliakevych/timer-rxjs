import { Observable, timer, Subscription, defer } from "rxjs";
import { share, finalize} from "rxjs/operators";

type registryItem = {
    timerId: Subscription,
    cache: Observable<number>
}
const registry = new Map<string, registryItem>();

function getDataSource$(config: string): registryItem {

    if (!registry.has(config)) {
        const source = {
            timerId: new Subscription(),
            cache: defer(() => {
                source.timerId.unsubscribe();
                return emulateRequest(config);
            }).pipe(finalize(() => {
                source.timerId = timer(1000, 5000).subscribe(() => {
                    registry.delete(config);
                })
            }), share())
        }
        registry.set(config, source)
    }
    return registry.get(config)!;
}

function emulateRequest(config: string): Observable<number> {
  return timer(1000, 2000);
}

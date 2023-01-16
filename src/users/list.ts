import { scan, Subject } from 'rxjs';
type Item = string;

const listState = new Subject<Item>();

const listChange = listState.asObservable().pipe(
  scan((list, item) => [...list, item], [] as Item[])
);

function add(item: Item): void {
  listState.next(item);
}

listChange.subscribe(list => console.log('obs1:', list));

add('hello');
add('world');

listChange.subscribe(list => console.log('obs2:', list));

add('bye bye');
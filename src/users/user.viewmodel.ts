import {
  map,
  merge,
  mergeMap,
  Observable,
  of,
  scan,
  startWith,
  Subject,
  tap,
} from "rxjs";
import { UserService } from "./user.service";
import { UserVm, User, initialUserVm, initialUser } from "./user.types";

export class UserViewModel {
  // this subject will be used to pass the person object
  // when selecting a person from the list
  // <div class="personrow" *ngFor="let person of vm.persons" (click)="personDetailSubj.next(person)"> ... </div>
  public vm$: Observable<UserVm> = of(initialUserVm);
  
  // user actions
  public selectUserState = new Subject<User>();
  public updateUserState = new Subject<User>();
  public addUserState = new Subject<User>();
  public deleteUserState = new Subject<User>();

  constructor(private svc: UserService) {
    // retrieving list of persons (could be a http request)
    const usersChange = this.svc.users.pipe(
      map((users) => (vm: UserVm) => ({ ...vm, users }))
    );

    // select a person, get detail and set it on viewmodel
    const selectUserChange = this.selectUserState.pipe(
      mergeMap((user) => this.svc.getUser(user.id)),
      map((user) => (vm: UserVm) => ({ ...vm, user }))
    );
    // don't forget to add addPerson$ to the merge operator
    const addUserChange = this.addUserState.pipe(
      // spread operator is used on the existing persons list to add the new person
      map((newUser) => (vm: UserVm) => ({
        ...vm,
        users: [...vm.users, newUser],
      }))
    );

    const deleteUserChange = this.deleteUserState.pipe(
      map((userToDelete) => (vm: UserVm) => ({
        ...vm,
        users: vm.users.filter((u) => u !== userToDelete),
      }))
    );

    const updateUserChange = this.updateUserState.pipe(
      map( userToUpdate => (vm:UserVm)=>{
        const indexOfPerson = vm.users.findIndex(p=>p===userToUpdate);
        // spread operator to maintain immutability of the persons array
        const users = [
          ...vm.users.slice(0,indexOfPerson),
          userToUpdate,
          ...vm.users.slice(indexOfPerson+ 1)
        ];
        return {...vm, users};
      })
    );


    // in this example the initial viewmodel state is provided with the second
    // parameter of the scan function. Alternatively one could provide an initial
    // state with the rxjs of function

    const vm$ = merge(
      usersChange,
      selectUserChange,
      addUserChange,
      deleteUserChange,
      updateUserChange
    ).pipe(
      scan((vm: UserVm, mutationFn: (vm: UserVm) => UserVm) => mutationFn(vm), {
        users: [],
        user: initialUser,
        filter: "",
      })
    );
  }
  // constructor
} // class

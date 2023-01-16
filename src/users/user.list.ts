import { BehaviorSubject, map, merge, Observable, of, scan } from "rxjs";
import { UserService } from "./user.service";
import { initialUserVm, User, UserVm } from "./user.types";


  class UserListComponent {
    public vm$ : Observable<UserVm> = of(initialUserVm);
    public uersFilterState = new BehaviorSubject<UserVm>(initialUserVm);

    constructor(private svc:UserService) {
      this.vm$ = merge(this.usersChanged).pipe(
        //scan( (vm:UserVm, mutationFn:(vm:UserVm)=>UserVm) => mutationFn(vm), {users:[], user:null})
      );
    }
    private usersChanged = this.svc.users.pipe(
      map( users => ({...initialUserVm, users }) )
    );
    // attempt filtering as another mutation on the viewmodel 
    private usersFilterChange = this.uersFilterState.pipe(
      map( userVm => ({
        ...userVm, 
        users: userVm.users.filter(p=> userVm.filter === "" || p.name.includes(userVm.filter))
      }) )
    )
  }
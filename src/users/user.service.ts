import { filter, first, Observable, of, Subject } from "rxjs";
import { User } from "./user.types";

const users: User[] = [
  { id: 1, name: "test1", email: "test1@test.com" },
  { id: 2, name: "test2", email: "test2@test.com" },
  { id: 3, name: "test3", email: "test3@test.com" },
];

export class UserService {
  // user crudl: create read update delete list 
  // list of users
  users: Observable<User[]> = of(users);
  // get single user
  getUser(id: number): Observable<User> {
    return of({ id: 1, name: "test1", email: "test1@test.com" });
  }
  // delete single user
  deleteUser(id: number): Observable<User> {
    return of({ id: 1, name: "test1", email: "test1@test.com" });
  }
    // add single user
  addUser(user: User): Observable<User> {
    return of({ id: 1, name: "test1", email: "test1@test.com" });
  }
  // update single user
  updateUser(user: User): Observable<User> {
    return of({ id: 1, name: "test1", email: "test1@test.com" });
  }
}

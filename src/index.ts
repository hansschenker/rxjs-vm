// import React from "react";
// import ReactDOM from "react-dom";
// import { App } from "./app";

import { UserService } from "./users/user.service";

const svc = new UserService();
const users = svc.users;
users
.subscribe(v => console.log("users:",v))

const user = svc.getUser(1)
user
.subscribe(v => console.log("user:",v))
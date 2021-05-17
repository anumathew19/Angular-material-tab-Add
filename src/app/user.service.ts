import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user-interface";

@Injectable()
export class UserService {
  
  userList: User[] = [];

  constructor(
    private http: HttpClient
    ) {}

  getUsers() {
    return this.userList;
  }

  getUser(id) {
    let user: User;
    this.userList.map((val) => {
      if (val.id == id) user = val;
    });
    return user;
  }

}

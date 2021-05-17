import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatTabChangeEvent } from "@angular/material";
import { UserService } from "../../user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/user-interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  userform: FormGroup;
  selectedIndex: number;
  msg: String = "";

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userform = this.fb.group({
      name: ["", Validators.required],
      username: ["", Validators.required],
      address: [""],
      pincode: [""],
      phone: ["", Validators.required],
      cardnumber: ["", Validators.required],
      expirydate: ["", Validators.required],
      securecode: ["", Validators.required],
      nameoncard: ["", Validators.required],
    });
    this.route.params.subscribe((param) => {
      console.log(param);
      if (param && param.id) {
        let user = this.userService.getUser(param.id);
        if (user) {
          this.userform.setValue(user);
        } else {
          this.router.navigate(["/home"]);
        }
      }
    });
  }

  add() {
    if (this.userform.valid) {
      this.userService.userList.push(this.userform.value);
      this.resetForm();
      console.log("Created data is :", this.userService.getUsers());
      this.router.navigate(["home"]);

    } else {
      this.msg = "Please complete form";
    }
  }

  resetForm() {
    console.log("reset", this.userform);
    this.userform.reset();
  }

  moveToSelectedTab(tabName: string) {
    for (
      let i = 0;
      i < document.querySelectorAll(".mat-tab-label-content").length;
      i++
    ) {
      if (
        (<HTMLElement>document.querySelectorAll(".mat-tab-label-content")[i])
          .innerText == tabName
      ) {
        (<HTMLElement>document.querySelectorAll(".mat-tab-label")[i]).click();
      }
    }
  }
}

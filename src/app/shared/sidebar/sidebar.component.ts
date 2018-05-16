import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  user: User;

  constructor(
    public _sidebar: SidebarService,
    public _userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    this.user = this._userService.user;
    this._sidebar.loadMenu();
  }

}

import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      title: 'main',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'dashboard', url: '/dashboard' },
        { title: 'progressBar', url: '/progress' },
        { title: 'charts', url: '/charts1' },
        { title: 'promises', url: '/promises' },
        { title: 'rxjs', url: '/rxjs' }
      ]
    }
  ];

  constructor() { }

}

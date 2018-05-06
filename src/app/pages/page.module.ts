import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/share.module';

import { PAGES_ROUTES } from './pages.routes';


@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Charts1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Charts1Component
    ]
})
export class PagesModule {}

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';


// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/share.module';
import { IncreaseComponent } from '../components/increase/increase.component';
import { DonutChartComponent } from '../components/donut-chart/donut-chart.component';


import { PAGES_ROUTES } from './pages.routes';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Charts1Component,
        IncreaseComponent,
        DonutChartComponent
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Charts1Component,
        IncreaseComponent,
        DonutChartComponent
    ]
})
export class PagesModule {}

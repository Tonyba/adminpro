import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipeModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/share.module';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Charts1Component } from './charts1/charts1.component';
import { PagesComponent } from './pages.component';

import { IncreaseComponent } from '../components/increase/increase.component';
import { DonutChartComponent } from '../components/donut-chart/donut-chart.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


import { PAGES_ROUTES } from './pages.routes';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { ModelUploadComponent } from '../components/model-upload/model-upload.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { MedicsComponent } from './medics/medics.component';
import { MedicComponent } from './medics/medic.component';




@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Charts1Component,
        IncreaseComponent,
        DonutChartComponent,
        AccountSettingsComponent,
        PromisesComponent,
        RxjsComponent,
        ProfileComponent,
        UsersComponent,
        ModelUploadComponent,
        HospitalsComponent,
        MedicsComponent,
        MedicComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipeModule
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

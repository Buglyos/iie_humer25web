import { Routes } from '@angular/router';
import { PositionComponent } from './position/position.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { EmployeeComponent } from './employee/employee.component';

export const routes: Routes = [
    {path:'position', component: PositionComponent },
    {path: '', redirectTo: 'position', pathMatch: 'full'},
    {path: 'home', component: HomeComponent },
    {path: 'about', component: AboutComponent },
    {path: 'employee', component: EmployeeComponent}



];

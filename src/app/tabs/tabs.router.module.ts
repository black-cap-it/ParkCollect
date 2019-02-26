import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: '',
        component: TabsPage,
        children: [
            {
                path: 'home',
                redirectTo: '../../home'
            },
            {
                path: 'manage',
                children: [
                    {
                        path: '',
                        loadChildren: '../manage/manage.module#ManagePageModule'
                    }
                ]
            },
            {
                path: 'manage/manage-detail',
                children: [
                    {
                        path: '',
                        loadChildren: '../manage-detail/manage-detail.module#ManageDetailPageModule'
                    }
                ]
            },
            {
                path: 'false',
                children: [
                    {
                        path: '',
                        loadChildren: '../false/false.module#FalsePageModule'
                    }
                ]
            },
            {
                path: 'false/false-detail',
                children: [
                    {
                        path: '',
                        loadChildren: '../false-detail/false-detail.module#FalseDetailPageModule'
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: '../profile/profile.module#ProfilePageModule'
                    }
                ]
            }
        ]
    },
    {
        path: '',
        redirectTo: 'tabs/manage',
        pathMatch: 'full'
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class TabsPageRoutingModule {}
import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { MessagesComponent } from './messages/messages.component'
import { MemberListComponent } from './members/member-list/member-list.component'
import { ListsComponent } from './lists/lists.component'
import { AuthGuard } from './_guards/auth.guard'
import { MemberDetailComponent } from './members/member-detail/member-detail.component'
import { MemberDetailResolver } from './_resolvers/member-detail.resolver'
import { MemberListResolver } from './_resolvers/member-list.resolver'

// First match wins
export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },

    // member areas
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children:[
            { path: 'messages', component: MessagesComponent },
            { path: 'members/:id', component: MemberDetailComponent, resolve:{user: MemberDetailResolver} }, 
            //users -> is how we are going to access data from the resolver ['user']
            { path: 'members', component: MemberListComponent, resolve:{users: MemberListResolver} },
            { path: 'lists', component: ListsComponent },
        ]
    },
    

    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
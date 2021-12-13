import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { MaterialModule } from "src/app/material/material.module";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CountdownComponent } from './countdown/countdown.component';

@NgModule({
    declarations:[
       HeaderComponent,
       SidebarComponent,
       CountdownComponent
    ],
    exports:[
       HeaderComponent,
       SidebarComponent,
       CountdownComponent
    ],
    imports:[
        MaterialModule,
        RouterModule
    ]
}) 

export class SharedModule {}
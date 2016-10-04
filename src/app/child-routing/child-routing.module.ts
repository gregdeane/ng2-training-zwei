import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChildRoutingComponent } from './child-routing.component';
import { ChildRoutingDetailComponent } from './child-routing-detail.component';
import { ChildRoutingListComponent } from './child-routing-list.component';
import { childRoutingRouting } from './child-routing.routing';
import { ChildRoutingService } from './child-routing.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    childRoutingRouting
  ],
  declarations: [
    ChildRoutingComponent,
    ChildRoutingDetailComponent,
    ChildRoutingListComponent
  ],
  providers: [
    ChildRoutingService
  ]
})
export class ChildRoutingModule {}

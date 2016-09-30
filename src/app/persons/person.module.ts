import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PersonComponent } from './person.component';
import { PersonDetailComponent } from './person-detail.component';
import { PersonListComponent } from './person-list.component';
import { personRouting } from './person.routing';
import { PersonService } from './person.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    personRouting
  ],
  declarations: [
    PersonComponent,
    PersonDetailComponent,
    PersonListComponent
  ],
  providers: [
    PersonService
  ]
})
export class PersonModule {}

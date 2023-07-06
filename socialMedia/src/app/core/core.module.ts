import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { PageSpinnerComponent } from './page-spinner/page-spinner.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent, PageSpinnerComponent],
  imports: [CommonModule,RouterModule,SharedModule],
  exports: [HeaderComponent, FooterComponent, NotFoundComponent,PageSpinnerComponent],
})
export class CoreModule {}

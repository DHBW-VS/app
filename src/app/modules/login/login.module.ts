import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { LoginRoutingModule } from './login-routing.module';
import { LoginPage } from './pages';

@NgModule({
  imports: [LoginRoutingModule, SharedModule],
  declarations: [LoginPage],
})
export class LoginPageModule {}

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SimpleNameComponent } from "./components/simple-name/simple-name.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SimpleNameComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

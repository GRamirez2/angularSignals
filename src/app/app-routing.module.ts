import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./components/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "name",
    loadComponent: () =>
      import("./components/simple-name/simple-name.component").then(
        (m) => m.SimpleNameComponent
      ),
  },
  {
    path: "about",
    loadComponent: () =>
      import("./components/about/about.component").then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./components/dead-link/dead-link.component").then(
        (m) => m.DeadLinkComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

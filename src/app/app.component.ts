import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div style="text-align:center" class="content">
      <h1>Welcome to {{ title }}!</h1>
      <a href="" class="list">Home</a><a href="about" class="list">About</a
      ><a href="name" class="list">Name</a>
    </div>

    <router-outlet></router-outlet>

    <div style="text-align:center" class="content">
      <h1>Footer</h1>
    </div>
  `,
  styles: [
    `
      .list {
        margin-right: 10px;
      }
    `,
  ],
})
export class AppComponent {
  title = "angularV16";
}

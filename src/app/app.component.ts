import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <div class="containerCol">
      <div style="text-align:center" class="content">
        <h1>{{ title }}</h1>
        <a href="" class="list">Home</a><a href="about" class="list">About</a
        ><a href="name" class="list">Name</a>
      </div>

      <div class="containerRow">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      .list {
        margin-right: 10px;
      }
      .containerCol {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100vh;
      }
      .containerRow {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        height: 100%;
      }
    `,
  ],
})
export class AppComponent {
  title = "Angular v16: Signals & Stand Alone Components";
}

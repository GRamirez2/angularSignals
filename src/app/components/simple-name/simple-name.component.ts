import {
  Component,
  computed,
  signal,
  Signal,
  WritableSignal,
} from "@angular/core";
import { CommonModule } from "@angular/common";

export interface Name {
  first: string;
  last: string;
  middle: string;
}

@Component({
  selector: "app-simple-name",
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      {{ name().first }}
      {{ name().middle | uppercase }}
      {{ name().last }}
    </p>
    <button (click)="counter()">Counter</button>{{ numb() }} <br /><br />
    {{ computedTest() }}
  `,
  styles: [],
})
export class SimpleNameComponent {
  name: WritableSignal<Name> = signal({
    first: "George",
    last: "Ramirez",
    middle: "a",
  });
  numb: WritableSignal<number> = signal(10);
  randomLetter: WritableSignal<string> = signal("z");

  computedTest: Signal<string> = computed(() => {
    if (this.numb() % 3 == 0 && this.name().middle === this.randomLetter()) {
      return "Hazzah";
    } else {
      return "boo";
    }
  });

  counter() {
    const current = this.numb();
    const newNumb = current + 4;
    this.numb.set(newNumb);
    if (newNumb % 3 == 0) {
      this.mutateSignal();
    }
    if (newNumb % 5 == 0) {
      this.updateSignal();
    }
  }

  mutateSignal() {
    this.name.mutate((value) => (value.middle = this.letterPicker()));
  }
  updateSignal() {
    this.numb.update((value) => value + 5);
  }

  letterPicker(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const ltr = alphabet[Math.floor(Math.random() * alphabet.length)];
    this.randomLetter.set(ltr);
    return ltr;
  }
}

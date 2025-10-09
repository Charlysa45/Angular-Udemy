import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CounterPageComponent {
  counter = 10
  counterSignal = signal(10)

  constructor() {}

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update((current) => current + value)
  }

  resetCounter() {
    this.counter = 0;
    this.counterSignal.set(0);
  }
}
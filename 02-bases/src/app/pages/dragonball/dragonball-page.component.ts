import { Component, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}

@Component({
  templateUrl: './dragonball-page.component.html',
  // imports: [NgClass]
})

export class DragonballPageComponent {
  name = signal('');
  power = signal(0);

  characters = signal<Character[]>([
    { id: 1, name: 'Gokú', power: 9001}
  ])

  addCharacter() {
    if (!this.name() !|| !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update((characters) => [...characters, newCharacter])
    this.resetFields()
  }

  resetFields() {
    this.name.set('')
    this.power.set(0)
  }
}
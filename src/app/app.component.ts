import { Component, OnInit, VERSION } from '@angular/core';
import { Dates } from './models/dates.model';
import { Hero } from './models/hero.model';
import { Villain } from './models/villain.model';
import { DatesService } from './services/dates.service';
import { VillainService } from './services/villain.service';
import { HeroService } from './services/hero.service';
import { interval, Subscription, take, takeWhile } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  datesList: Dates[];
  constructor(
    private dateService: DatesService,
    private heroService: HeroService,
    private villainService: VillainService
  ) {}
  heroList: Hero[];
  selectedHero?: Hero;
  unavailableHero?: Hero;
  onHeroSelect(hero: Hero): void {
    this.selectedHero = hero;
    this.selectedHero.selected = true;
  }

  villainList: Villain[];
  selectedVillain?: Villain;
  unavailableVillain?: Villain;
  onVillainSelect(villain: Villain): void {
    this.selectedVillain = villain;
    if ((this.selectedVillain.selected = false)) {
      this.selectedVillain.selected = true;
    } else if ((this.selectedVillain.selected = true)) {
      this.selectedVillain.selected = false;
    }
  }

  subscription: Subscription;
  totalUses: number;
  rollValue: number;
  maxRoll: number;
  minRoll: number;
  battleNumbers: number;
  activeHeroes: number = 3;
  activeVillains: number = 3;
  rollClick() {
    this.maxRoll = this.selectedHero.diceMax;
    this.minRoll = this.selectedHero.diceMin;
    this.rollValue = Math.floor(
      Math.random() * (this.maxRoll - this.minRoll + 1) + this.minRoll
    );
    if ((this.selectedVillain.selected = true)) {
      // If Villain health is Below 0, make Heroes no longer able to attack
      if (this.selectedVillain.health <= 0 && this.selectedHero.uses < 0) {
        this.selectedVillain.selected = false;
        this.selectedVillain.available = false;
      }
      // As long as Villain health and Hero Uses are above 0, heroes can attack
      else if (this.selectedHero.uses > 0 && this.selectedVillain.health > 0) {
        this.selectedVillain.health =
          this.selectedVillain.health - this.rollValue;
        this.selectedHero.uses--;
      }
    } else {
      alert('please select a villain');
    }
  }
  checkEndgame(): any {
    if (this.villainList.some((villain) => villain.health === 0)) {
      this.selectedVillain.available = false;
      console.log(this.selectedVillain.name + ' is not available');
    }
  }

  ngOnInit() {
    this.dateService.getAllDates().subscribe((data) => {
      this.datesList = data;
      console.log(this.datesList);
    });
    this.heroService.getAllHeroes().subscribe((data) => {
      this.heroList = data;
      console.log(this.heroList);
    });
    this.villainService.getAllVillains().subscribe((data) => {
      this.villainList = data;
      console.log(this.villainList);
    });
    setInterval(this.checkEndgame(), 1000);
  }
}

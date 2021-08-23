import { Component } from '@angular/core';
import { HelloWorldService } from 'src/app/services/hello-world/hello-world.service';
import { Greeting } from 'src/app/models/greeting';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  greetings: Greeting[] = [];

  constructor(private helloWorldService: HelloWorldService) {

  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.helloWorldService.getGreetings().subscribe((data) => this.updateGreetings(data));
  }

  updateGreetings(greetings: Greeting[]) {
    console.log(greetings);
    this.greetings = greetings as Greeting[];
  }
}

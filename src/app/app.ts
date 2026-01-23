import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ProjectsComponent } from "./components/projects/projects.component";
import { ExperienceComponent } from "./components/experience/experience.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WelcomeComponent, ProjectsComponent, ExperienceComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('porfolio');
}

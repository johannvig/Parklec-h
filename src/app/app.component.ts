import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Note: 'styleUrl' should be 'styleUrls' and should be an array.
})
export class AppComponent {
  title = 'parkingApp';
}

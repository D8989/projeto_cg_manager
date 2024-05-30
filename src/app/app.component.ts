import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, PaginaInicialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'cg_manager';
}

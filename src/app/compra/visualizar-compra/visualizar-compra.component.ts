import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visualizar-compra',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './visualizar-compra.component.html',
  styleUrl: './visualizar-compra.component.css',
})
export class VisualizarCompraComponent {}

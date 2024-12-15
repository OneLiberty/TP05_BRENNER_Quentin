import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { PanierState } from '../panier/panier.state';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';

@Component({
  selector: 'app-tetiere',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tetiere.component.html',
  styleUrls: ['./tetiere.component.css']
})
export class TetiereComponent {
  store = inject(Store);
  nombreProduits$: Observable<number> = this.store.select(PanierState.getNombreProduits);
  produits$: Observable<Produit[]> = this.store.select(PanierState.getProduits);
  dropdownOpen = false;

  toggleDropdown(state: boolean) {
    this.dropdownOpen = state;
  }
}
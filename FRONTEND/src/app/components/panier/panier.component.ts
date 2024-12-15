import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { PanierState } from './panier.state';
import { Observable } from 'rxjs';
import { Produit } from '../../models/produit.model';
import { RemoveProduit } from './panier.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent {
  @Select(PanierState.getProduits) produits$!: Observable<Produit[]>;

  constructor(private store: Store) {}

  onRemoveFromCart(produitId: number): void {
    this.store.dispatch(new RemoveProduit(produitId));
  }
}
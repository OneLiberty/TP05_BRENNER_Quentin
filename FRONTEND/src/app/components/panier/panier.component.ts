import { Component, inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { PanierState } from '../panier/panier.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';
import { RemoveProduit, UpdateQuantity } from './panier.actions';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  store = inject(Store);
  produits$: Observable<Produit[]> = this.store.select(PanierState.getProduits);
  totalAmount$: Observable<number> = this.store.select(PanierState.getTotalAmount);

  onRemoveFromCart(produitId: number): void {
    this.store.dispatch(new RemoveProduit(produitId));
  }

  onUpdateQuantity(produitId: number, event: Event | number): void {
    let quantity: number;
    if (typeof event === 'number') {
      quantity = event;
    } else {
      const inputElement = event.target as HTMLInputElement;
      quantity = parseInt(inputElement.value, 10);
    }
    if (!isNaN(quantity) && quantity > 0) {
      this.store.dispatch(new UpdateQuantity(produitId, quantity));
    }
  }

  onPayer(): void {
    // pour la suite
    alert('Paiement effectué !');
  }
}
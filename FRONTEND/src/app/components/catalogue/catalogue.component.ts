import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Produit } from '../../models/produit.model';
import { CatalogueService } from '../../services/catalogue.service';
import { AddProduit } from '../panier/panier.actions';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  produits: Produit[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private readonly catalogueService: CatalogueService, private store: Store) {}
  
  ngOnInit(): void {
    this.subscription.add(
      this.catalogueService.getCatalogue().subscribe((data: Produit[]) => {
        this.produits = data;
      })
    );
  }
  
  onSearchResults(filteredProducts: Produit[]): void {
    this.produits = filteredProducts;
  }

  onAddToCart(produit: Produit): void {
    this.store.dispatch(new AddProduit(produit));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
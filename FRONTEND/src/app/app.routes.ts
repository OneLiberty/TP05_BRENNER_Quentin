import { Routes } from '@angular/router';
import { PanierComponent } from './components/panier/panier.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';

export const routes: Routes = [
    { path: '', component: CatalogueComponent },
    { path: 'panier', component: PanierComponent },
  ];
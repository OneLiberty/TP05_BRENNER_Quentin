import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddProduit, RemoveProduit, UpdateQuantity } from './panier.actions';
import { Produit } from '../../models/produit.model';

export interface PanierStateModel {
  produits: Produit[];
}

@State<PanierStateModel>({
  name: 'panier',
  defaults: {
    produits: []
  }
})
@Injectable()
export class PanierState {
  @Selector()
  static getProduits(state: PanierStateModel) {
    return state.produits;
  }

  @Selector()
  static getNombreProduits(state: PanierStateModel) {
    return state.produits.reduce((total, produit) => total + produit.quantity, 0);
  }

  @Selector()
  static getTotalAmount(state: PanierStateModel) {
    return state.produits.reduce((total, produit) => total + produit.price * produit.quantity, 0);
  }

  @Action(AddProduit)
  add({ getState, patchState }: StateContext<PanierStateModel>, { produit }: AddProduit) {
    const state = getState();
    const existingProduit = state.produits.find(p => p.id === produit.id);
    if (existingProduit) {
      patchState({
        produits: state.produits.map(p => p.id === produit.id ? { ...p, quantity: p.quantity + 1 } : p)
      });
    } else {
      patchState({
        produits: [...state.produits, { ...produit, quantity: 1 }]
      });
    }
  }

  @Action(RemoveProduit)
  remove({ getState, patchState }: StateContext<PanierStateModel>, { produitId }: RemoveProduit) {
    patchState({
      produits: getState().produits.filter(p => p.id !== produitId)
    });
  }

  @Action(UpdateQuantity)
  updateQuantity({ getState, patchState }: StateContext<PanierStateModel>, { produitId, quantity }: UpdateQuantity) {
    patchState({
      produits: getState().produits.map(p => p.id === produitId ? { ...p, quantity } : p)
    });
  }
}
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddProduit, RemoveProduit } from './panier.actions';
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
export class PanierState {
  @Selector()
  static getProduits(state: PanierStateModel) {
    return state.produits;
  }

  @Selector()
  static getNombreProduits(state: PanierStateModel) {
    return state.produits.length;
  }

  @Action(AddProduit)
  add({ getState, patchState }: StateContext<PanierStateModel>, { produit }: AddProduit) {
    const state = getState();
    patchState({
      produits: [...state.produits, produit]
    });
  }

  @Action(RemoveProduit)
  remove({ getState, patchState }: StateContext<PanierStateModel>, { produitId }: RemoveProduit) {
    patchState({
      produits: getState().produits.filter(p => p.id !== produitId)
    });
  }
}
import { Produit } from '../../models/produit.model';

export class AddProduit {
    static readonly type = '[Panier] Add Produit';
    constructor(public produit: Produit) {}
}
  
export class RemoveProduit {
    static readonly type = '[Panier] Remove Produit';
    constructor(public produitId: number) {}
}
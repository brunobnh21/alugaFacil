import { ImovelService, Imovel} from './../../services/imovel.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImovelDetailsComponent } from '../imovel-details/imovel-details.component';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  public imoveis = this.imovelService.allImoveis();

  constructor(private modalController: ModalController, private imovelService: ImovelService) { }

  ngOnInit() {
  }

  async showDetails(imovel: Imovel){
    const modal = await this.modalController.create({
      component: ImovelDetailsComponent,
      componentProps: {imovel}
    });

    await modal.present();

  }

}

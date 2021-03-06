import { Imovel, ImovelService } from './../../services/imovel.service';

import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-imovel-details',
  templateUrl: './imovel-details.component.html',
  styleUrls: ['./imovel-details.component.scss'],
})
export class ImovelDetailsComponent implements OnInit {

  @Input() imovel: Imovel;

  constructor(private imovelService: ImovelService, private modalController: ModalController) {
  }

  ngOnInit() {
  }

  public getEndereco() {
    // tslint:disable-next-line: max-line-length
    return this.imovel.logradouro + ', ' + this.imovel.numero + ' - ' + this.imovel.bairro + ', ' + this.imovel.localidade + ' - ' + this.imovel.uf;
  }

  public getDetalhes() {
    return this.imovel.m2 + 'm² - ' + this.imovel.numeroQuarto + ' Quartos - ' + this.imovel.numeroVagas + ' Vagas';
  }

  public getWhatsapp(){
    if (this.imovel.usuario != null && this.imovel.usuario.whatsapp != null){
    return 'https://api.whatsapp.com/send?phone=' + this.imovel.usuario.whatsapp + '&text= Olá ' + this.imovel.usuario.nome + ', teria um minuto pra falarmos sobre o' + this.imovel.nome + '?';
    } else {
    // tslint:disable-next-line: max-line-length
    return 'https://api.whatsapp.com/send?phone=' + 5511959575401 + '&text= Olá Daniel, teria um minuto pra falarmos sobre o' + this.imovel.nome + '?';
    }
  }

  public getMapa() {
    return 'https://maps.googleapis.com/maps/api/staticmap?zoom=15&size=400x400&markers=color:red|' + this.getEndereco() + '&key=AIzaSyAVYmLs9uS6D1FLgs1vpjo4IF4ymcYfFGQ';
  }

  public favoritar(){
    if (this.imovel.like === true) {
      this.imovel.like = false;
    } else {
      this.imovel.like = true;
    }
    this.imovelService.update(this.imovel);
    this.modalController.dismiss();
  }

  public voltar(){
    this.modalController.dismiss();
  }

}

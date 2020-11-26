import { ImovelService, Imovel } from './../../services/imovel.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public imovel: Imovel;

  constructor(private imovelService: ImovelService, private navCtrl: NavController, private http: HttpClient
  ) { }

  ngOnInit() {
    this.imovel = this.imovelService.empty();
  }

  async buscaCep(cep){
    cep.replace(/\D/g, '');
    if (cep != null) {
    const url = 'https://viacep.com.br/ws/' + cep + '/json/';
    (this.http.get(url).toPromise() as Promise<Imovel>)
        .then(res => this.imovel = res);

      }  else {
          // null
      }
  }

  save() {
    this.imovelService.create(this.imovel);
    this.navCtrl.back();
  }

}

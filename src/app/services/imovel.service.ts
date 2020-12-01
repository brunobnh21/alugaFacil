import { Usuario, UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Imovel {
  id: number;
  nome: string;
  valor: number;
  like: boolean;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento: string;
  numero: string;
  img: string;
  m2: string;
  numeroQuarto: number;
  numeroVagas: number;
  mobiliado: boolean;
  proxEstacao: boolean;
  descricao: string;
  usuario: Usuario;
}

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  usuarioService = UsuarioService;

  constructor(private storage: Storage) {
    this.loadData();
  }

  private imoveis: Imovel[] = [];

  private async loadData() {
    const loadedImoveis = await this.storage.get('imoveis') as Imovel[];
    this.imoveis.push(...loadedImoveis);
  }

  private storeData() {
    this.storage.set('imoveis', this.imoveis);
  }

  public empty(): Imovel {
    return {
      id: 0,
      nome: '',
      valor: 0,
      like: false,
      cep: '',
      logradouro: '',
      numero: '',
      bairro: '',
      localidade: '',
      uf: '',
      complemento: '',
      img: '',
      m2: '',
      numeroQuarto: 0,
      numeroVagas: 0,
      mobiliado: false,
      proxEstacao: false,
      descricao: null,
      usuario: {id: 0, nome: 'Daniel Victor de Souza', username: 'dsouza', password: '*****', email: 'souza.dvictor@gmail.com',
      whatsapp: 5511959575401}
    };
  }

  public allImoveis(): Readonly<Array<Readonly<Imovel>>> {
    return this.imoveis;
  }

  public find(id: number): Imovel {
    return { ...this.imoveis.find(s => s.id === id) };
  }

  public update(updatedImovel: Imovel): void {
    const imovelIndex = this.imoveis.findIndex(s => s.id === updatedImovel.id);
    this.imoveis[imovelIndex] = updatedImovel;
    this.storeData();
  }

  public create(newImovel: Imovel) {
    const maxId = Math.max(...this.imoveis.map(s => s.id));
    this.imoveis.push({ ...newImovel, id: maxId + 1 });
    this.storeData();
  }
}

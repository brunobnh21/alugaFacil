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

  private imoveis: Imovel[] = [
    {id: 0, nome: 'Apartamento com 2 Quartos', valor: 3000, logradouro: 'Rua Augusta', numero: '400', bairro: 'Consolação', uf: 'São Paulo',
    localidade: 'SP', complemento: '', img: 'https://s2.glbimg.com/S68qSscRNuEDNZ2vavmrtyUWfA8=/512x320/smart/e.glbimg.com/og/ed/f/original/2018/12/10/apartamento-pequeno-doob-arquitetura09.jpg',
    m2: '45', numeroQuarto: 2, numeroVagas: 1, cep: '04905-000', mobiliado: false, proxEstacao: true, descricao: 'Lindo apartamento com dois quartos com espaço aberto e linda sacada.', like: false,
    usuario: {id: 0, nome: 'Daniel Victor de Souza', username: 'dsouza', password: '*****', email: 'souza.dvictor@gmail.com',
    whatsapp: 5511959575401}}
  ];

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

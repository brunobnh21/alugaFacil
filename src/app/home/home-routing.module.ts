import { SobrePageModule } from './../sobre/sobre.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'alugar',
        pathMatch: 'full'
      },
      {
        path: 'cadastro',
        loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
      },
      {
        path: 'alugar',
        loadChildren: () => import('./alugar/alugar.module').then( m => m.AlugarPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
      },
      {
        path: 'sobre',
        loadChildren: () => import('../sobre/sobre.module').then( m => m.SobrePageModule)
      },
      {
        path: 'contato',
        loadChildren: () => import('../contato/contato.module').then( m => m.ContatoPageModule)
      }
    ]
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}

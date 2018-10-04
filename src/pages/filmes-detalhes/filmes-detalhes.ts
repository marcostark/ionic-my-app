import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

@IonicPage()
@Component({
  selector: 'page-filmes-detalhes',
  templateUrl: 'filmes-detalhes.html',
  providers: [MoovieProvider]
})
export class FilmesDetalhesPage {

  public filme;
  public filmeId;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public movieProvider: MoovieProvider) {
  }

  ionViewDidEnter() {
    this.filmeId = this.navParams.get("id");    
    this.movieProvider.getMovie(this.filmeId).subscribe(
      data=>{
        let retorno = (data as any)._body
        this.filme = JSON.parse(retorno) // Convertendo a string para JSON
      }, error=> {
        console.log(error)
      }
    )
  }

}

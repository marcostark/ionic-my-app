import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmesDetalhesPage } from '../filmes-detalhes/filmes-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public lista_filmes = new Array<any>();
  public pageAtual = 1;

  public nome_usuario:string = "Marcos Souza";
  public loading;
  public refresher;
  public isRefresher: boolean = false;
  public infinityScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider: MoovieProvider,
    public loadingCtrl: LoadingController) {
  }

  openLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    this.loading.present();    
  }

  closeLoading() {
    this.loading.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefresher = true;

    this.carregarFilmes();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  /**
   * Parte do ciclo de vida página
   */
  ionViewDidEnter() {
    this.carregarFilmes();
  }

  abrirDetalhes(filme) {
    //console.log(filme);
    this.navCtrl.push(FilmesDetalhesPage, {id: filme.id})
  }

  doInfinite(infiniteScroll) {
    this.pageAtual++ ;
    this.infinityScroll = infiniteScroll;
    this.carregarFilmes(true); //Carregar nova página    
  }

  carregarFilmes(newpage: boolean = false) {

    this.openLoading();
    this.movieProvider.getLatestMovies(this.pageAtual).subscribe(
      data=> {

        const response = (data as any);
        const obj_retorno = JSON.parse(response._body)

        // Quando for a primeira pagina
        if(newpage) {
          this.lista_filmes = this.lista_filmes.concat(obj_retorno.results);
          this.infinityScroll.complete(); // Encerrando o inifityScroll
        } else { // Quando não...
          this.lista_filmes = obj_retorno.results;
        }
        
        //Depois de terminar de carregar
        this.closeLoading();       
        if(this.isRefresher){
          this.refresher.complete();
          this.isRefresher = false;
        }

      }, error => {
        console.log(error)
        this.closeLoading();
        if(this.isRefresher){
          this.refresher.complete();
          this.isRefresher = false;
        }
      } )
  }
  
}

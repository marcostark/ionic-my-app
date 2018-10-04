import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

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

  public nome_usuario:string = "Marcos Souza";
  public loading;
  public refresher;
  public isRefresher: boolean = false;

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

  carregarFilmes() {

    this.openLoading();
    this.movieProvider.getLatestMovies().subscribe(
      data=> {

        const response = (data as any);
        const obj_retorno = JSON.parse(response._body)
        this.lista_filmes = obj_retorno.results;

        console.log(obj_retorno);

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

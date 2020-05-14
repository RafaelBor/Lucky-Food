import { Component, OnInit } from '@angular/core';
import { NavController, IonSlide, IonSlides } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import {CodigosService} from '../../services/codigos.service';
import {LoginService} from '../../services/login.service'
import {Codigos} from '../../models/codigos'

@Component({
  selector: 'app-juego-adivinar',
  templateUrl: './juego-adivinar.page.html',
  styleUrls: ['./juego-adivinar.page.scss'],
  providers: [LoginService, CodigosService]
})
export class JuegoAdivinarPage implements OnInit {

  public aleatorio: any
  public opor:number = 5;
  public ganaste:number = 0;
  public perdiste:number = 0;
  public token;
  public identity;
  public status;
  public codigo: Codigos;
  
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private _codigosService: CodigosService,
    private _loginService: LoginService
  ) {
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();
    this.codigo = new Codigos(1, 1, 1, "");

   }

  ngOnInit() {
    
  }
  
  

  numero(){
    var mostrar = document.getElementById('mostrar');
    var adivinar = (<HTMLInputElement>document.getElementById('adivinar')).value;
    var resultado = document.getElementById('resultado');
    var oportunidades = document.getElementById('oportunidades');
    var ganar = document.getElementById('ganar');
    var perder = document.getElementById('perder');
    
    var aleatorio = Math.round(Math.random()*5);
    var alea = aleatorio.toString();
    var adiv = adivinar.toString();  

    this.opor--;
    
      if(adiv == alea){
        console.log("Ganaste")
        var adivinar = (<HTMLInputElement>document.getElementById('adivinar')).value = "";
        resultado.innerHTML = "GANASTE";
        this.ganaste++;


      }else{
        console.log("Perdiste")
        var adivinar = (<HTMLInputElement>document.getElementById('adivinar')).value = "";
        resultado.innerHTML = "PERDISTE :(";
        this.perdiste++;
        
      }



      if(this.opor == 0 && this.ganaste == 2){
        this.AlertGanar();
        this.agregarCodigo();
      
      } 
      if(this.opor == 0 && this.ganaste == 3){
        this.AlertGanar();
        this.agregarCodigo();
      
      } 
      if(this.opor == 0 && this.perdiste == 4){
        this.AlertaPerder();
      }
      
      if(this.opor == 0 && this.perdiste == 5){
        this.AlertaPerder();
        

        
        
      }
  
      
  
     
      oportunidades.innerHTML = this.opor.toString();
      mostrar.innerHTML = alea;
      ganar.innerHTML = this.ganaste.toString();
      perder.innerHTML = this.perdiste.toString();

    
    console.log(this.opor);
   
  }

  


  agregarCodigo(){
    
      this._codigosService.agregarCodigo(this.token, this.codigo).subscribe(
        response=>{
          if(response.status == 'success'){
            this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
          }else{
            this.status = 'error';
           }error =>{
            this.status = 'error';
            console.log(<any> error);
          }
        }
      
      )
     
      
    
    
  }
  

  async AlertGanar() {
    const alert = await this.alertController.create({
      header: 'GANASTE!!',
      subHeader: 'Felicidades !',
      message: 'Has ganado uno de nuestros cupones, si que tienes suerte !',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancelar');
        }
      },
      {
        text: 'salir',
        cssClass: 'secondary',
        handler: () => {
          console.log('Ok');
          this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
        }
      }
      ]
    });

    await alert.present();
  }

  async AlertaPerder() {
    const alert = await this.alertController.create({
      header: 'Perdiste :(!!',
      subHeader: 'Lo siento !',
      message: 'Hoy no se pudo, pero la proxima ves si podras !',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancelar');
        }
      },
      {
        text: 'salir',
        cssClass: 'secondary',
        handler: () => {
          console.log('Ok');
          this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
        }
      }
      ]
    });

    await alert.present();
  }

}

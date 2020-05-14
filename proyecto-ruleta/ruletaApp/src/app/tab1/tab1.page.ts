import { Component, OnInit, DoCheck } from '@angular/core';
import {LoginService} from '../services/login.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../models/users'
import {AccesoService} from '../services/acceso.service'
import {} from '../models/users';
import { AlertController } from '@ionic/angular';
import { NavController, IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [LoginService, AccesoService]
})
export class Tab1Page implements OnInit, DoCheck{

  public token;
  public identity;
  public status;
  public user: User;
  public turnos: boolean;
  constructor(
    private _accesoServices: AccesoService,
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute,
    public alertController: AlertController,
    private navCtrl: NavController
  ) {
    
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();
    this.user = new User(1, "", "", "", "", "", 0, 0);

   this.user = new User(this.identity.sub,
                          this.identity.nombre,
                          this.identity.apellido,
                          this.identity.role,
                          this.identity.email,
                          this.identity.password,
                          this.identity.puntaje,
                          this.identity.turnos); 
  }

  ngDoCheck(){
    this.identity = this._loginService.getIdentity();
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    
  this.identity = this._loginService.getIdentity();
    console.log(this.identity);
  }




  jugar(){
    if(this.identity.turnos > 0){
      this.turnos = true;
    }else{
      this.turnos = false;
    }
    if(this.turnos == true){
      this._router.navigate(['/menu-juegos']);
      this._accesoServices.sumarPutanje(this.token,  this.user).subscribe(
        response=>{
           if(response.status == 'success'){
         // console.log("puntaje corecto");
           console.log(response);
           console.log(response.changes.turnos);

           if(response.changes.puntaje){
            this.user.puntaje = response.changes.puntaje;
          }

          if(response.changes.id){
            this.user.sub = response.changes.id;
          }

          if(response.changes.role){
            this.user.role = response.changes.role;
          }

          

          if(response.changes.turnos){
            this.user.turnos = response.changes.turnos;
          }

          if(this.identity.turnos = 0){
            this.user.turnos = response.changes.turnos;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
         }else{
          this.status = 'error';
         }
        }
       )
    }else{
      this.presentAlert();
    }

    

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Upss',
      subHeader: 'No tienes turnos',
      message: 'Para poder jugar necesitas comprar turnos',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Cancelar');
        }
      },
      {
        text: 'Comprar',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Ok');
          this.navCtrl.navigateRoot('comprar-turno', {animated: true});
        }
      }
      ]
    });

    await alert.present();
  }

}

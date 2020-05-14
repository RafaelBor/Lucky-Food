import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {AccesoService} from '../../services/acceso.service';
import {User} from '../../models/users';
import { LoginService } from '../../services/login.service';
import { NavController, IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-comprar-turno',
  templateUrl: './comprar-turno.page.html',
  styleUrls: ['./comprar-turno.page.scss'],
})
export class ComprarTurnoPage implements OnInit {

  
  public token;
  public identity;
  public status;
  public user: User;
  constructor(
    private _accesoServices: AccesoService,
    private _router: Router,
    private _route: ActivatedRoute,
    private navCtrl: NavController,
    private _loginService: LoginService
  ) { 
    this.token = this._loginService.getToken();
    this.identity = this._loginService.getIdentity();
    this.user = new User(1, "", "", "", "", "", 0, 0);
    //objeto rellenado
    this.user = new User(this.identity.sub,
      this.identity.nombre,
      this.identity.apellido,
      this.identity.role,
      this.identity.email,
      this.identity.password,
      this.identity.puntaje,
      this.identity.turnos);
  }

  ngOnInit() {
    this.identity = this._loginService.getIdentity();

  }

  turnos(){
    this._accesoServices.turnos(this.token,  this.user).subscribe(
      response=>{
         if(response.status == 'success'){
         // this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
         this._router.navigate(['/main/tabs/tab1']);
         console.log("puntaje corecto");
         console.log(response);
         console.log(response.changes.turnos);

        if(response.changes.turnos){
          this.user.turnos = response.changes.turnos;
        }

        this.identity = this.user;
        localStorage.setItem('identity', JSON.stringify(this.identity));
         console.log(this.identity);
       }else{
        this.status = 'error';
       }error =>{
        this.status = 'error';
        console.log(<any> error);
      }
      }
     )
  }

}

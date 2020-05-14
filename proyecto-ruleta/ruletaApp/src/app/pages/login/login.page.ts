import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from 'src/app/models/users';
import {NgForm} from '@angular/forms';
import {LoginService} from '../../services/login.service'
import { NavController, IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [LoginService]
})
export class LoginPage implements OnInit {
    
    @ViewChild( 'slidePrincipal', {static: true} ) slides: IonSlides;
  
    public user: User;
    public status: string;
    public token;
    public identity;
 

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute,
    private navCtrl: NavController
  ) { 
    this.user = new User(1, "", "", "", "", "", 0, 0)
     
  }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  

  

  onSubmit(form){
    this._loginService.signup(this.user).subscribe(
      response =>{
        //TOKEN
        if(response.status != 'error'){
          this.status = 'success'
          this.token = response;

          //OBJETO USUARIO IDENTIFICADO
              this._loginService.signup(this.user, true).subscribe(
                response =>{

                    this.identity = response;  

                    console.log(this.token);
                    console.log(this.identity);

                    //PERSISTIR DATOS DE USUARIO IDENTIFICADO
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('identity', JSON.stringify(this.identity));

                    //Redireccionar a inicio
                    if(this.identity.role == 'Usuario'){
                      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
                    }

                    if(this.identity.role == 'Restaurante'){
                      this.navCtrl.navigateRoot('tabs-res/inicio-restaurante', {animated: true});
                    }
                     
          
                },
                error =>{
                  this.status = 'error';
                  console.log(<any> error);
                }
              );
        }else{
          this.status = 'error';
        }

      },
      error =>{
        this.status = 'error';
        console.log(<any> error);
      }
    );

    
  }

  registro( fRegistro: NgForm){
    this._loginService.register(this.user).subscribe(
      response =>{
        if(response.status == 'success'){
          this.status = response.status;
          
          
        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error)
      }
    );
    
  }



  mostrarRegistro(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );
  }

  mostrarLogin(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
  }

  
  
}

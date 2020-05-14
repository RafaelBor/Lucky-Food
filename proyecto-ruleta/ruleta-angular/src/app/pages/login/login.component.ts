import { Component, OnInit } from '@angular/core';
import {Admin} from '../../models/admin';
import {AdminService} from '../../services/admin.service';
import {Router, ActivatedRoute, Params} from '@angular/router';


import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AdminService]
})
export class LoginComponent implements OnInit {

  public admin: Admin;

  public status:string;
  public token;
  public identity;

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.admin = new Admin(1, '', '', '', '', '');
  

   }

  ngOnInit() {
    this.logout();
  }

  onSubmit(from){
    this._adminService.signup(this.admin).subscribe(
      response => {
      
        //TOKEN
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          //OBJETO IDENTIFICADO
          this._adminService.signup(this.admin, true).subscribe(
            response => {
                this.identity = response;  
                
                console.log(this.token);
                console.log(this.identity);

                //Persistir datos
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                //Redireccionar a inicio
                this._router.navigate(['admin']);
            },
            error => {
              this.status = 'error'
              console.log(<any>error);
            }
          )

        }else{
          this.status = 'error'
        }
      },
      error => {
        this.status = 'error'
        console.log(<any>error);
      }
    )
  }

  logout(){
    this._route.params.subscribe(params =>{
      let logout = +params['sure'];

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //Redireccionar a inicio
        this._router.navigate(['inicio']);
        
      }
    })
}

}

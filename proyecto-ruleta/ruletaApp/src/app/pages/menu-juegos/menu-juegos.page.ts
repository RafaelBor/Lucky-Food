import { Component, OnInit } from '@angular/core';
import { NavController, IonSlide, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-menu-juegos',
  templateUrl: './menu-juegos.page.html',
  styleUrls: ['./menu-juegos.page.scss'],
})
export class MenuJuegosPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  adivinar(){
    this.navCtrl.navigateRoot('juego-adivinar', {animated: true});
  }

}

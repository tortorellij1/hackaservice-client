import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
 
@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
    email: string;
    password: string;
    loading: any;
    sdf: any;
    constructor(public navCtrl: NavController, public authService: Auth, public loadingCtrl: LoadingController) {

    }
    ionViewDidLoad() {
        this.showLoader();
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
    }
    login(){
        this.showLoader();
        let credentials = {
            email: this.email,
            password: this.password
        };
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log('reeeeezult: ' + JSON.stringify(result));
            this.navCtrl.setRoot(HomePage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
    }
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }
    showLoader(){
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        this.loading.present();
    }
}

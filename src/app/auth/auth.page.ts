import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  authForm: FormGroup;
  authMode: string = 'login';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    this.authForm = this.fb.group({
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const { username, email, password } = this.authForm.value;

    if (this.authMode === 'login') {
      this.authService.login(username, password).subscribe(
        () => this.router.navigate(['/home']),
        error => console.error(error)
      );
    } else {
      this.authService.register(username, email, password).subscribe(
        async () => {
          await this.showAlert('Compte créé', 'Votre compte a été créé avec succès.');
          this.authMode = 'login';
          this.authForm.reset();
        },
        error => console.error(error)
      );
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  continueWithoutAccount() {
    this.router.navigate(['/home']);
  }
}

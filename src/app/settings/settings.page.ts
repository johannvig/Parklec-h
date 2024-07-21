import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  darkMode: boolean = false;

  constructor(private authService: AuthService, private alertController: AlertController) {}

  ngOnInit() {
  }

  async changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: 'Les nouveaux mots de passe ne correspondent pas.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    try {
      await this.authService.changePassword(this.currentPassword, this.newPassword);
      const alert = await this.alertController.create({
        header: 'Succès',
        message: 'Le mot de passe a été changé avec succès.',
        buttons: ['OK']
      });
      await alert.present();
    } catch (error: unknown) {
      let errorMessage = 'Une erreur est survenue';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      const alert = await this.alertController.create({
        header: 'Erreur',
        message: errorMessage,
        buttons: ['OK']
      });
      await alert.present();
    }
  }

 
}

import { Component } from '@angular/core';
// Import du module Camera pour prendre des photos
import {Camera} from '@ionic-native/camera';
// Import du module Base64ToGallery pour convertir les photos en Base 64
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
// Import du module Media Capture pour prendre des vidéos
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
// Import menu multiple
import { ActionSheetController } from 'ionic-angular'
// Import loader
import { LoadingController } from 'ionic-angular';
// Import du module de notification
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})

/* *** CLASSE HomePage *** */
export class CameraPage {
  // Déclaration des attributs de la Classe
  // -- Tableau d'image
  base64Image: String[];
  // -- Chemin vers la vidéo
  path: string;

  constructor(private camera: Camera,
              private base64ToGallery: Base64ToGallery,
              public actionSheetCtrl: ActionSheetController,
              public loadingCtrl: LoadingController,
              private mediaCapture: MediaCapture,
              private localNotifications: LocalNotifications) {
    // On instancie les attributs
    this.base64Image = [];

  }

  /***************************************/
  /* *** *** PRENDRE UNE PHOTO * *** *** */
  /***************************************/
  takePicture(){
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image.push("data:image/jpeg;base64," + imageData);
    }, (err) => {
      console.log(err);
    });
  }

  /***************************************/
  /* ***  * TESTER AJOUTER UNE IMAGE * * */
  /***************************************/
  testPicture(){
    this.base64Image.push('data:image/png;base64,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');
  }

  /***************************************/
  /* *** ** ENREGISTRER UNE IMAGE ** *** */
  /***************************************/
  savePicture(key){

    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    // On supprime les caractères spécifiques à la balise img pour pouvoir récupérer uniquement la base 64 de l'image
    this.base64ToGallery.base64ToGallery(this.base64Image[key].replace("data:image/jpeg;base64,", ''), { prefix: '_img' }).then(
      res => {
        // Notification
        this.sendNotification('Image enregistrée dans votre galerie');
        console.log('Saved image to gallery ', res);
        // Fermeture du Loader
        loading.dismiss();
      },
      err => {
        // Notification
        this.sendNotification(`Un problème est survenu lors de l'enregistrement de votre photo`);
        console.log('Error saving image to gallery ', err);
        // Fermeture du Loader
        loading.dismiss();
      }
    );
  }

  /***************************************/
  /* *** *** SUPPRIMER UNE IMAGE *** *** */
  /***************************************/
  removePicture(key){
    this.base64Image.splice(key, 1);
    // Notification
    this.sendNotification('Votre image a été supprimée !');
  }

  /***************************************/
  /* *** ACTION CLIQUE SUR UNE IMAGE *** */
  /***************************************/
  presentActionSheet(key) {
    const actionSheet = this.actionSheetCtrl.create({
      title: `Action dur l'image`,
      buttons: [
        {
          // ACTION SUPPRIMER
          text: 'Supprimer',
          role: 'destructive',
          handler: () => {
            this.removePicture(key);
          }
        },
        {
          // ACTION ENREGISTRER
          text: 'Enregistrer',
          handler: () => {
            this.savePicture(key);
          }
        },
        {
          // ACTION QUITTER
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  /***************************************/
  /* *** *** PRENDRE UNE PHOTO *** *** */
  /***************************************/
  takeVideo(){
    // On définit les options de capture
    // -- Limite de temps de vidéo à 10 secondes
    let options: CaptureImageOptions = { limit: 10 };
    this.mediaCapture.captureImage(options)
      .then(
        (data: MediaFile[]) => {
          // On assigne le chemin à la variable $path
          this.path = data[0].fullPath;
          // Notification
          this.sendNotification('Votre vidéo a été enregistrée dans votre galerie !');
        },
        (err: CaptureError) => console.error(err)
      );
  }

  /***************************************/
  /* *** *** ENVOYER UNE NOTIFICATION *** *** */
  /***************************************/
  sendNotification(message){
    this.localNotifications.schedule({
      text: message
    });
  }
}

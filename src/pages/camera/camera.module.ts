import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CameraPage } from './camera';

// PERSO
// Module Camera pour prendre des photos
import { Camera } from '@ionic-native/camera';
// Module Media-Capture pour prendre des vidéos
import { MediaCapture } from "@ionic-native/media-capture";
// Module Base64ToGallery pour convertir les images en Base 64
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
// Import du module de notification
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    CameraPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraPage),
  ],
  // PERSO
  providers: [
    Camera,
    Base64ToGallery,
    MediaCapture,
    LocalNotifications
  ]
})
export class CameraPageModule {}

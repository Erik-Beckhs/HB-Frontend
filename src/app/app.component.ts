import { Component } from '@angular/core';
import { SettingsService } from './services/shared/settings.service';

declare function import_plugins():any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public _settings:SettingsService){
    import_plugins()
  }
}

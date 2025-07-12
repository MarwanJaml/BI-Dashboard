import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

// Import Bootstrap JS (optional - only if you need JS functionality)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServerComponent } from "../../server/server";
import { Server } from '../../shared/server';

const SAMPLE_SERVERS = [
  { id: 1, name: 'dev-web', isOnline: true },
  { id: 2, name: 'dev-mail', isOnline: false },
  { id: 3, name: 'prod-web', isOnline: true },
  { id: 4, name: 'prod-mail', isOnline: true }
];
@Component({
  selector: 'app-section-health',
  standalone: true,
  imports: [CommonModule, ServerComponent],
  templateUrl: './section-health.html',
  styleUrl: './section-health.css'
})
export class SectionHealthComponent {

  servers: Server[]= SAMPLE_SERVERS;
}

import { Component, Input, OnInit } from '@angular/core';
import { Server } from '../shared/server';
import { NgStyle } from '@angular/common';



@Component({
  selector: 'app-server',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './server.html',
  styleUrl: './server.css'

})

export class ServerComponent implements OnInit {

  constructor() { }
  color: string = 'blue';
  buttonText: string = 'Toggle Status';
  serverStatus: string = 'Offline'; // Default status
  isLoading: boolean = false;

@Input() serverInput: Server = { id: 0, name: '', isOnline: false }; // Example default

  
  ngOnInit(): void {
    this.setServerStatus(this.serverInput.isOnline);
  }

    setServerStatus(isOnline: boolean) {
    if (isOnline) {
      this.serverInput.isOnline = true;
      this.serverStatus = 'Online';
      this.color = '#66BB6A',
      this.buttonText = 'Shut Down';
    } else {
      this.serverInput.isOnline = false;
      this.serverStatus = 'Offline';
      this.color = '#FF6B6B';
      this.buttonText = 'Start';
    }
  }


  toggleStatus(isOnline: boolean) {
    console.log(this.serverInput.name, ':' , this.serverStatus)
    this.setServerStatus(!isOnline);
  }



}

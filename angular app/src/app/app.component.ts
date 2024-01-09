import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CrudService } from './crud.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private crud:CrudService){}  

  postData: any = {
    name: "eldritch blast",
    range: "120"
  };

  cantripToDelete: string = 'eldritch blast';

  getItems() {
    this.crud.getAll().subscribe((data) => {
      console.log(data);
    });
  }

  sendData() {
    this.crud.postData(this.postData).subscribe((response) => {
      console.log(response);
    });
  }

  deleteData() {
    this.crud.deleteData(this.cantripToDelete).subscribe(
      (response) => {
        console.log(response);
      }
    );
  } 


}

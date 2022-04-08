import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  //Logo de de la institución
  public logo='assets/images/LogoCiculo.png'
  constructor() { }

  ngOnInit(): void {
  }

}

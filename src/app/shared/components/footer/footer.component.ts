import { Component, OnInit } from '@angular/core';
import { FOOTER_SECTIONS } from './footer-sections';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  footerSections = FOOTER_SECTIONS

  constructor() { }

  ngOnInit() {
  }

}

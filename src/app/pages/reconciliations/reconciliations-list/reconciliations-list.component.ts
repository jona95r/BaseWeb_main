import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reconciliations-list',
  templateUrl: './reconciliations-list.component.html',
  styleUrls: ['./reconciliations-list.component.scss']
})
export class ReconciliationsListComponent implements OnInit {
  loading: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}

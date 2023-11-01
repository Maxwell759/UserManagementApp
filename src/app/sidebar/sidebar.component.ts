import { Component, OnInit } from '@angular/core';
import { sidebarData } from './sidebar-data';
import { TableService } from '../table/table.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user:any;
  constructor(
    private _serviceList:TableService
  ) {}
  
  ngOnInit(): void {
    // this.user = localStorage.getItem('currentUser');
    this.getOneUser()
  }
  sidebarList = sidebarData
  today = new Date()
  date = new Intl.DateTimeFormat('en-uk',{
    dateStyle: 'short',
    timeStyle: 'medium',
  })
  todayDate = this.date.format(this.today)
  
   
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser');
  }

  getOneUser() {
    this._serviceList.getoneUser(2).subscribe((data)=>{
     this.user = data
      console.log(data)
    })
  }
}

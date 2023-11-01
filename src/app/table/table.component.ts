import { Component, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TableService } from './table.service';
import { SignUp } from '../sign-up/sign-up';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  records: SignUp[] = [];
  record: any;
  isEditMode: boolean = false;
  searchText: string = '';
  filteredItems = this.records;

  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages!: number;
  paginatedData: any[] = [];
  user: any 
  isApproved: boolean = false;
  disable:boolean=false;
par!:number;
  constructor(
    private recordService: RecordService,
    private router: Router,
    private modalService: NgbModal,
    private _serviceList:TableService,
    private _toaster:ToastrService
  ) {}

  ngOnInit(): void {
    this.loadRecords();
    this.getOneUser();
  }


  approveToggle(id:number): void {
    if(id>=this.user.data.id)
    this.isApproved = !this.isApproved;
  }
  loadRecords() {
    this._serviceList.getUser(2).subscribe((data:any)=>{
  
      this.records = data.data;
      this.record=data;
      this.totalPages = Math.ceil(this.record.total / this.itemsPerPage);
      console.log( this.totalPages)
    })
  }

  getOneUser() {
    this._serviceList.getoneUser(2).subscribe((data)=>{
     this.user = data
      console.log(data)
    })
  }

  onDeleteConfirm(content: any, i: any): void {
    console.log(i)
    this.modalService.open(content).result.then((result) => {
      if (result === 'confirm') {
        this.onDelete(i);
      }
    });
  }

  onDelete(data: any): void {
    if((this.user.data.id + 1) == data.id) {
      const recordToDelete = data;
      console.log(data)
      if (recordToDelete) {
        this._serviceList.deleteUser(recordToDelete.id).subscribe(
          () => {
            this.records.splice(data, 1);
          },
          (error) => {
            console.error('Error deleting record:', error);
          }
        );
      } else {
        console.error('Record not found');
      }
  
    } else {
      window.alert('You dont have the permission to Delete this user')
    }
   
  }

  onEdit(item: any, i: number) {
    if((this.user.data.id + 1) == i) {
      this.record = item;
    this.recordService.editMode();
    this.router.navigate(['/body/new-record'], {
      queryParams: { editedRecord: JSON.stringify(item) },
    });
    } else {
      this._toaster.error('You dont have the permission to edit this user')
   
    }
  }

  onApprove(item: any, i: number) {
    if((this.user.data.id + 1) == i) {
      this._toaster.success('You have Approved ' + this.records[i].first_name);
      this.disable=true;
      this.par = i;
      this.approveToggle(i);
    } else {
      this._toaster.error('You dont have the permission to edit this user')
    }
  }

  performSearch(): void {
    if (this.searchText.trim() !== '') {
      this.recordService.searchRecords(this.searchText).subscribe(
        (data: any[]) => {
          this.records = data;
        },
        (error: any) => {
          console.error('Error searching records:', error);
        }
      );
    } else {
      this.loadRecords(); // If search term is empty, reload all records
    }
  }


  paginateData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.record.data.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateData();
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private records: any[] = []
  isEditMode: boolean = false;
  // private localStorageKey = 'records'; 
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    // this.loadRecords();
  }
  
  getRecords() {
    return this.http.get<any>(`${this.apiUrl}/records`);
  }
  
  editMode() {
    this.isEditMode = true;
  }
  createRecord(record: any) {
    return this.http.post<any>(`${this.apiUrl}/records`, record);
  }
  
  updateRecord(updatedRecord: any) {
    return this.http.put<any>(`${this.apiUrl}/records/${updatedRecord.id}`, updatedRecord);
  }

  searchRecords(searchText: string): any {
    const params = new HttpParams().set('q', searchText);
    return this.http.get<any>(`${this.apiUrl}/records`, { params });
  }

  deleteRecord(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/records/${id}`);
  }

  
}

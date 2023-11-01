import { Component, Input, OnInit } from '@angular/core';
import { RecordService } from '../record.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../sign-up/sign-up.service';
import { SignUp } from '../sign-up/sign-up';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.css'],
})
export class NewRecordComponent implements OnInit {
  @Input() records: any;
  recordForm!: FormGroup;
  isEditMode: boolean = false;
  user!: SignUp;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private recordService: RecordService,
    private _editService: SignUpService
  ) {
    this.recordForm = this.formBuilder.group({
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['editedRecord']) {
        const editRecord = JSON.parse(params['editedRecord']);
        this.user= editRecord;
        console.log(editRecord)
        this.setupForm(editRecord);
      } else {
        this.setupForm({});
      }
    });
  }

  setupForm(data: any): void {
    this.recordForm = this.formBuilder.group({
      id: [data.id || ''], // Change 'id' if it differs from your data model
      first_name: [data.first_name || '', Validators.required],
      email: [data.email || '', Validators.email],
      last_name: [data.last_name || ''],
      // Add other form controls as necessary based on your data model
    });

    this.isEditMode = data && data.id !== undefined; // Set edit mode based on the presence of ID or any other identifier
  }


  UpdateRecord(formData:any) {
    if (this.recordForm.valid) {
      const formValue = this.recordForm.value;
      const updatedRecord = {
        id: formValue.id,
        name: formValue.last_name,
        email: formValue.email,
    
      
      };
      if (this.isEditMode) {
        // Update existing record
        updatedRecord.id = this.recordForm.value.id; // Set the ID field
        this.recordService.updateRecord(updatedRecord).subscribe(
          () => {
            this.router.navigate(['/body/table']);
          },
          (error) => {
            console.error('Error updating record:', error);
          }
        );
      } 
    }
  }

  submitForm(): void {
   
      console.log('Updated Record:', this.recordForm.value);
      // Handle update logic using this.recordForm.value for edited data
      this._editService.editUser(this.user, this.recordForm.value.first_name, this.recordForm.value.jobtitle)
      .subscribe((data) => {
      
        this.router.navigate(['/body/table'])
        alert("Succefully Edited ")
      });

  
}
}

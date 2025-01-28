import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiserviceService } from '../../apiservice.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-queries',
  imports: [CommonModule , FormsModule],
  templateUrl: './queries.component.html',
  styleUrl: './queries.component.css'
})
export class QueriesComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  // isVisible: boolean = true;
  programs: any[] = [];
  selectedProgram: string = '';
  name: string = '';
  email: string = '';
  query: string = '';
  formError: boolean = true;
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  isValidEmail(): boolean {
    return this.emailRegex.test(this.email);
  }

  constructor(private http : HttpClient , private apiservice: ApiserviceService) { }

  ngOnInit(): void {
    this.fetchPrograms();
  }

  fetchPrograms(): void {
    this.http.get<any[]>(this.apiservice.jobApi).subscribe(
      (response) => {
        this.programs = response; // Assuming the response is an array of programs
      },
      (error) => {
        console.error('Error fetching programs', error);
      }
    );
  }

  // closeModal() {
  //   this.isVisible = false;
  // }

  closeModal(): void {
    this.close.emit();  // Emit the close event to the parent component
  }


  raiseQuery(): void {
    
    this.formError = false;

    if (!this.name || !this.email || !this.selectedProgram || !this.query) {
      this.formError = true;
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please fill out all required fields correctly.',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (!this.isValidEmail()) {
      this.formError = true;
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
        confirmButtonText: 'OK',
      });
      return;
    }

    const queryPayload = {
      queryID: 0,  // Assuming 0 for a new query
      name: this.name,
      email: this.email,
      program: this.selectedProgram,
      query: this.query,
      isActive: true  // Assuming the query is active by default
    };

    this.http.post(this.apiservice.raiseQuery, queryPayload).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Query Raised',
          text: 'Your query has been successfully submitted.',
          confirmButtonText: 'OK',
        });

        // Reset form after submission
        this.name = '';
        this.email = '';
        this.selectedProgram = '';
        this.query = '';
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an issue submitting your query. Please try again later.',
          confirmButtonText: 'OK',
        });
        console.error(err);  // Log the error for debugging
      }
    });
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user-service.service';
declare var bootstrap: any;

@Component({
  selector: 'app-form-record',
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  templateUrl: './form-record.component.html',
  styleUrl: './form-record.component.css',
})
export class FormRecordComponent {
  userForm: FormGroup;
  creatingUser: boolean = false;
  activationURL: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.creatingUser = true;
      this.userService.signup(this.userForm.value).subscribe(
        (response) => {
          this.activationURL = response.activationURL;
          const modalElement = document.getElementById('activationModal');
          const modal = new bootstrap.Modal(modalElement!);
          modal.show();
        },
        (error) => {
          this.creatingUser = false;
          if (error.status === 409) {
            const modalElement = document.getElementById('conflictModal');
            const modal = new bootstrap.Modal(modalElement!);
            modal.show();
          }
        }
      );
    }
    this.userForm.reset();
  }
}
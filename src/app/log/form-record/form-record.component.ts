import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup, FormsModule, ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {passwordMatchValidator} from './equivalent.validator';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../services/user-service.service';
import {RouterLink} from '@angular/router';
declare var bootstrap: any;

@Component({
  selector: 'app-form-record',
  templateUrl: './form-record.component.html',
  styleUrls: ['./form-record.component.css'],
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,

  ]
})
export class FormRecordComponent {
  userForm: FormGroup;
  creatingUser: boolean = false;
  activationURL: string = '';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
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


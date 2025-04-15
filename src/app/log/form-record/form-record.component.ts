import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {BookserviceService} from '../../services/bookservice.service';

@Component({
  selector: 'app-form-record',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-record.component.html',
  styleUrl: './form-record.component.css'
})
export class FormRecordComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService : BookserviceService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      this.userService.signup(this.userForm.value).subscribe(
        response => console.log('User signed up!', response),
        error => console.error('Signup failed:', error)
      );
    }
  }
}

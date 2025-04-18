import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service.service';
import { LocalStorageService } from '../../services/local-storage.service';
declare var bootstrap: any;

@Component({
  selector: 'app-auth',
  imports: [RouterLink, ReactiveFormsModule,CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  loginForm: FormGroup;
  attemptLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.attemptLogin = true;
      this.userService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.localStorage.set("authToken",response.loginAuthToken)
          this.router.navigate(['/offerte']);
        },
        error: (error) => {
          this.attemptLogin = false;
          if (error.status === 401) {
            const modalElement = document.getElementById('conflictModal');
            const modal = new bootstrap.Modal(modalElement!);
            modal.show();
          }
        }
      });
    }
  }
}
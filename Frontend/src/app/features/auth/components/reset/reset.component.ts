import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
})
export class ResetComponent {
  resetForm: FormGroup;
  token!: any;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      console.log('Invalid form:', this.resetForm.errors);
      return;
    }

    console.log('Submitting:', this.resetForm.value);
    this.token = this.route.snapshot.queryParamMap.get('token') || null;
    this.http
      .post(`${environment.Url}/api/v1/auth/resetPassword`, {
        password: this.resetForm.value.password,
        token: this.token,
      })
      .subscribe({
        next: (response) => {
          // console.log('Success:', response);
          this.toastr.success(
            'Reset Email has been Sent Successfully',
            'success'
          );
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          // console.error('Error:', error);
          this.toastr.error('Email is not registered', 'error');
        },
      });
  }
}
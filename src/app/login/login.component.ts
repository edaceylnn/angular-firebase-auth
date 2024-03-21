import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password)
  }

  signup(): void {
    this.router.navigateByUrl('/register');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.updateMousePosition(event);
  }

  constructor(private elementRef: ElementRef) {}

  updateMousePosition(event: MouseEvent) {
    const cardElement = this.elementRef.nativeElement.querySelector('.card');
    if (cardElement) {
      const { clientX, clientY } = event;
      cardElement.style.setProperty('--x', `${clientX}px`);
      cardElement.style.setProperty('--y', `${clientY}px`);
    }
  }

  @ViewChild('tiltRef') tiltRef: ElementRef | undefined;

  rotateX: string = '0';
  rotateY: string = '0';
  onHover: boolean = false;
  maxRotate: number = 2;

  ngOnInit(): void {}

  @HostListener('mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    if (this.tiltRef && this.tiltRef.nativeElement) {
      const {
        offsetWidth: width,
        offsetHeight: height,
        offsetLeft,
        offsetTop,
      } = this.tiltRef.nativeElement;

      const centerX = offsetLeft + width / 2;
      const centerY = offsetTop + height / 2;

      const mouseX = event.clientX - centerX;
      const mouseY = event.clientY - centerY;

      const rotateY = (mouseX / (width / 2)) * this.maxRotate * 1;
      const rotateX = (mouseY / (height / 2)) * this.maxRotate * -1;

      this.rotateX = rotateX.toFixed(2);
      this.rotateY = rotateY.toFixed(2);
    }
  }

  @HostListener('mouseleave')
  handleMouseLeave() {
    this.backToDefaultPosition();
    this.onHover = false;
  }

  @HostListener('mouseenter')
  handleMouseEnter() {
    this.onHover = true;
  }

  backToDefaultPosition() {
    if (this.tiltRef && this.tiltRef.nativeElement) {
      this.rotateX = '0';
      this.rotateY = '0';
    }
  }
}

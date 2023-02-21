import { LoadingService } from './../../domain/service/loading.service';
import { MoviesService } from 'src/app/domain/service/activity.service';
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { formatDate, LocationStrategy } from '@angular/common';
import { Activity } from 'src/app/domain/model/activity';
import { DateAdapter, NativeDateAdapter } from '@angular/material/core';
import { Movie } from 'src/app/domain/model/movie';

class PickDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {
      return format(date, 'dd/MM/yyyy');
  }
}

@Component({
  selector: 'app-add-update-game',
  templateUrl: './add-update-game.page.html',
  styleUrls: ['./add-update-game.page.scss'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter}
  ]
})
export class AddUpdateGamePage implements OnInit {
  movieForm: FormGroup;
  loading$ = this.loadingService.loading$;
  constructor(
    private formBuilder: FormBuilder,
    private movieService: MoviesService,
    private location: LocationStrategy,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.createFormGroup();
  }

  private createFormGroup() {
    this.movieForm = this.formBuilder.group({
      name: ['', { validators: [Validators.required] }],
      description: ['', { validators: [Validators.required] }],
      genre: ['', { validators: [Validators.required] }],
      director: ['', { validators: [Validators.required] }],
      year: [0, { validators: [Validators.required, Validators.pattern('^[1-9][0-9][0-9][0-9]$'), Validators.max(2023)] }],
    });
  }
  dateRegex(): string | RegExp {
    return '^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$';
  }

  navigateBack(): void {
    this.location.back();
  }

  public getErrorMessage(fieldName: string): string {
    const field = this.movieForm.get(fieldName);
    if (field === null) {
      return '';
    }
    if (field.hasError('required')) {
      return 'This field is required';
    }
    if (field.hasError('pattern')) {
      return 'The input does not respect the required format';
    }
    return '';
  }

  public insertMovie(): void {
    this.movieService.insert(this.convertFormToMovie(this.movieForm.value));
    this.location.back();
  }

  private convertFormToMovie(formValue: any): Movie {
    return {
      name: formValue.name,
      description: formValue.description,
      genre: formValue.genre,
      director: formValue.director,
      year: formValue.year,
    } as Movie;
  }
}

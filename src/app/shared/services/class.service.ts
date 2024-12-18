import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, map , throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ResponseApi } from './response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  baseApi:string = environment.apiUrl;
  apiUrl:string=''
  constructor(private http: HttpClient,) { }

  public getListDaysHours():Observable<any> {
    this.apiUrl = this.baseApi + '/classgojp/get_list_days_hours'
    return this.http.get<any>(this.apiUrl);
  }

  public setWeeklyScheduleTemplate(weeklyScheduleTemplateRequest: { user_id: string, selectedTimes: any[] }): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/save_weekly_schedule_template' ;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ResponseApi>(this.apiUrl, weeklyScheduleTemplateRequest, { headers });
  }

  public getWeeklyScheduleTemplate(user_id: string): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/load_weekly_schedule_template';
    const params = new HttpParams().set('user_id', user_id);  // Set the user_id as a query parameter
    return this.http.get<ResponseApi>(this.apiUrl, { params });
  }

  public getScheduleTeacher(teacher_id: string, student_id: string, formattedDate: string, dayOfWeek: string, showUnavailable: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_schedule_teacher'
    const params = new HttpParams()
      .set('teacher_id', teacher_id)
      .set('student_id', student_id)
      .set('formattedDate', formattedDate)
      .set('dayOfWeek', dayOfWeek)
      .set('showUnavailable', showUnavailable);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public getScheduleGroupCourse(course_id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_schedule_group_course'
    const params = new HttpParams()
      .set('course_id', course_id);
   
    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public getScheduleTeacherIgnoreWeeklyTemplate(teacher_id: string, formattedDate: string, dayOfWeek: string, showUnavailable: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_schedule_teacher_ignore_weekly_template'
    const params = new HttpParams()
      .set('teacher_id', teacher_id)
      .set('formattedDate', formattedDate)
      .set('dayOfWeek', dayOfWeek)
      .set('showUnavailable', showUnavailable);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public getScheduleUser(user_id:string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_schedule_user'
    const params = new HttpParams()
      .set('user_id', user_id);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public setUnsetAvailability(teacher_id: string, date: string, hour_id: number, set_unavailable: boolean): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/set_unavailable_schedule'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { teacher_id, date, hour_id, set_unavailable };

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }

  public getListTeachers(): Observable<any> {
    this.apiUrl = this.baseApi + '/classgojp/get_list_teachers'
    return this.http.get<any>(this.apiUrl);
  }

  public getDetailTeacher(teacher_id: string, user_id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_detail_teacher'
    const params = new HttpParams()
      .set('teacher_id', teacher_id)
      .set('user_id', user_id);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public createCourseBystudent(user_id: string, teacher_id: string, date: string, hour_id: number, type_class:string, name:string, duration:number): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/create_course_bystudent'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { user_id, teacher_id, date, hour_id, type_class, name , duration};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }
  
  public getDetailCourse(course_id: number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_detail_course'
    const params = new HttpParams()
      .set('course_id', course_id);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public createCustomCourse(user_id: string, teacher_id: string, course_name: string, max_participants: number, course_schedule:any[]): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/create_custom_course'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { user_id, teacher_id, course_name, max_participants, course_schedule};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }

  public joinCourse(user_id: string, course_id: string, student_id: string): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/join_course'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { user_id, course_id, student_id};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }
}

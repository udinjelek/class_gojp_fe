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

  public uploadProfilPic(user_id: string, form_data: FormData, file_name: string): Observable<any> {
    this.apiUrl = this.baseApi + '/classgojp/upload-profile-pic';

    // Set request headers, if necessary
    const headers = new HttpHeaders(); // If you don't need custom headers, this can be empty

    form_data.append('user_id', user_id);
    form_data.append('file_name', file_name);

    return this.http.post<any>(this.apiUrl, form_data, { headers });
  }

  public joinCourse(user_id: string, course_id: string, student_id: string): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/join_course'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { user_id, course_id, student_id};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }

  public updatePassword(user_id: string, passwords_current: string, passwords_new: string, passwords_confirm: string ): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/update_password'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { user_id, passwords_current, passwords_new, passwords_confirm};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }

  public updateProfile(user_data:any): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/update_profile'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { user_data};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }

  

  public getDetailSelf(user_id: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_detail_self'
    const params = new HttpParams()
      .set('user_id', user_id);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public getSearchUsers(search_name:string, page_select:number): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_search_users'
    const params = new HttpParams()
      .set('search_name', search_name)
      .set('page_select', page_select);
    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public getDataUser(target_id:string, user_id:string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_data_user'
    const params = new HttpParams()
      .set('target_id', target_id)
      .set('user_id', user_id);
    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public setInvertRole(target_id:string, user_id:string): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/set_invert_role'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { target_id, user_id};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }

  public resetPassword(token_id: string, password_new: string, password_confirm: string ): Observable<ResponseApi> {
    this.apiUrl = this.baseApi + '/classgojp/reset_password'
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const requestBody = { token_id, password_new, password_confirm};

    return this.http.post<ResponseApi>(this.apiUrl, requestBody, { headers });
  }

  public getValidResetPassword(token_id: string):Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_valid_reset_password'
    const params = new HttpParams()
      .set('token_id', token_id);
    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  public getHomePageContent():Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.apiUrl = this.baseApi + '/classgojp/get_home_page_content'
    const params = new HttpParams();
    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}

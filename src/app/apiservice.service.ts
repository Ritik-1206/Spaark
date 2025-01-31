import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor() { }

  //public apiUrl = 'http://184.168.122.146:801/api';
  //public apiUrl = 'https://localhost:5000/api';
  //public apiUrl = 'https://localhost:7002/api';
  public apiUrl = 'https://spaarkoverseas.com:7002/api';

  public readonly jobApi = this.apiUrl + '/jobs';
  public readonly blogApi = this.apiUrl + '/blogs';
  public readonly enquire = this.apiUrl + '/Registration';
  public readonly raiseQuery = this.apiUrl + '/QueriesC';
  public readonly reviews = this.apiUrl + '/reviews';
  public readonly images = this.apiUrl + '/Images'
  public readonly login = this.apiUrl + '/AdminLogins/validateLogin';
  public readonly otpValidation = this.apiUrl + '/AdminLogins/validateOTP';
  public readonly resetPassword = this.apiUrl + '/AdminLogins/ResetPassword';
  public readonly resetOTP = this.apiUrl + '/AdminLogins/ResetPasswordOTP';
  public readonly createUser = this.apiUrl + '/AdminLogins/CreateUser';
  public readonly subscribe = this.apiUrl + '/Subscribes';

  getBlogUrl(blogID: number): string {
    return `${this.blogApi}/${blogID}`;
  }

  getJobUrl(jobID: number): string {
    return `${this.jobApi}/${jobID}`;
  }

  getInternUrl(jobID: number): string {
    return `${this.jobApi}/${jobID}`;
  }

  getImageUrl(imageId: number): string{
    return `${this.images}/${imageId}`;
  }

  getReviewUrl(reviewId: number): string{
    return `${this.reviews}/${reviewId}`;
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, lastValueFrom } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';



@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private oktaAuthService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next)); 
  }
  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add an access token for secured endpoints
    const securedEndpoints = ['http://localhost:8080/api/order'];
    if(securedEndpoints.some(url => request.urlWithParams.includes(url))){
       // get access token
       const accessToken = await this.oktaAuth.getAccessToken();

       // clone the request and new header with access token
       request = request.clone({
        setHeaders:{
          Authorization: 'Bearer ' + accessToken
        } 
       });
    }
    
    //return next.handle(request).toPromise();
    return await lastValueFrom(next.handle(request));
  }
}

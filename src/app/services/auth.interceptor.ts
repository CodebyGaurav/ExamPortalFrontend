import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

// const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(
        private loginService: LoginService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authReg = req;

        //add  the jwt token (localstoreage request)
        const token =  this.loginService.getToken();    
        console.log("inside interceptor");
        
        if(token != null){
            authReg = authReg.clone(
                {setHeaders:{Authorization:`Bearer ${token}`},
            })
        }   
        return next.handle(authReg);
    }

}

export const authInterceptorProviders = [
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { catchError, throwError } from "rxjs";
import { ErrorComponent } from "./error/error.component";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {


  constructor(public dialog: MatDialog) {}

    intercept(req: HttpRequest<any>,next: HttpHandler){

        return next.handle(req).pipe(
          catchError((err: HttpErrorResponse) =>{
            //console.log("our error-intercept",err);
            //alert(err.error.Status.message);

            let errorMessage = "unknown error";
            if(err.error.status.messages){
              errorMessage=err.error.status.messages
            }
            this.dialog.open(ErrorComponent,{data:{message: err.error.status.message
            }})
            return throwError(err);
          })

        );
    }
}

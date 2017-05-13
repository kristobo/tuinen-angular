import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {environment} from "../../environments/environment";

// Override angular HTTP class to handle different environments and set correct headers
@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(path: string, options?: RequestOptionsArgs): Observable<Response> {
        let url = this.updateUrl(path);
        return super.get(url, this.getRequestOptionArgs(path, options));
    }

    post(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let url = this.updateUrl(path);
        return super.post(url, body, this.getRequestOptionArgs(path, options));
    }

    put(path: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let url = this.updateUrl(path);
        return super.put(url, body, this.getRequestOptionArgs(path, options));
    }

    delete(path: string, options?: RequestOptionsArgs): Observable<Response> {
        let url = this.updateUrl(path);
        return super.delete(url, this.getRequestOptionArgs(path, options));
    }

    private updateUrl(req: string) {
        return  environment.origin + req;
    }

    private getRequestOptionArgs(path: String, options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        let token = sessionStorage.getItem('token');

        if(token && path != "/login" ){
            options.headers.append('Authorization', token);
            options.headers.append('Content-Type', 'application/json');
        }

        return options;
    }
}
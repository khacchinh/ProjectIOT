﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Climate } from '../_models/index';

@Injectable()
export class ClimateService {
    constructor(private http: Http, private config: AppConfig) { }

    getAll(server: string) {
        return this.http.get(this.config.apiUrl + '/climates/server_name/' + server, this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/climates/current/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    getAllServerName(){
        return this.http.get(this.config.apiUrl + '/climates/servers', this.jwt()).map((response: Response) => response.json());
    }

    getDataClimateChart(server: string) {
        return this.http.get(this.config.apiUrl + '/climates/data_charts/' + server, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';
import { environment } from '../../../environments/environment';

@Injectable()
export class MSALService {
    // private applicationConfig: any = {
    //     clientID: 'df7cc9df-8073-4017-a108-390c4ca170f0',
    //     graphScopes: ['user.read']
    // };

    private applicationConfig: any = {
        clientID: 'client-id-here',
        authority: 'authority here',
        b2cScopes: ['scopes'],
        redirectUrl: 'http://localhost:4200',
        extraQueryParameter: 'extra query params'
    };

    private app: any;
    public user: any;
    constructor() {
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authority,
            (errorDesc, token, error, tokenType) => {
              // console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        this.app.redirectUri=this.applicationConfig.redirectUrl;
    }
    public login() {
        let tokenData = '';
        this.app.loginRedirect(this.applicationConfig.b2cScopes).then(data => {tokenData = data; });
    }

    public getUser() {
        const user = this.app.getUser();
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.b2cScopes)
            .then(accessToken => {
               // console.log(accessToken);
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.b2cScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                     //  console.error(err);
                    });
            });
    }
}

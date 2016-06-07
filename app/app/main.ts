import {bootstrap}    from 'angular2/platform/browser';
import {enableProdMode} from 'angular2/core';
import {AppComponent} from './components/app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Jsonp} from 'angular2/http';
import 'rxjs/Rx';
enableProdMode();
bootstrap(AppComponent, [ROUTER_PROVIDERS,HTTP_PROVIDERS,Jsonp]);
//\"   sass --watch app/:app/    \"

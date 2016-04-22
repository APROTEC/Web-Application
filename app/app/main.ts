import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/app/app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {Jsonp} from 'angular2/http';
import 'rxjs/Rx';

bootstrap(AppComponent, [ROUTER_PROVIDERS,HTTP_PROVIDERS,Jsonp]);
//\"   sass --watch app/:app/    \"

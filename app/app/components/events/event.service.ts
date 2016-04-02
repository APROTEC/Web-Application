import {Injectable} from 'angular2/core';
import { EVENTS } from './mock-events';
import {IEvent} from './event';


@Injectable()
export class EventService{
    getEvents(){
        return Promise.resolve(EVENTS);
    }
}

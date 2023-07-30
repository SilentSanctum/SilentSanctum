import { Injectable } from '@angular/core';
import { BackendConnectionService } from './backend-connection.service';

@Injectable({
  providedIn: 'root',
})
export class ReactionsService {
  constructor(private backendService: BackendConnectionService) {}
  allReactions: any = {};
}

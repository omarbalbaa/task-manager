import { TestBed } from '@angular/core/testing';

import { LocalTaskService } from './local-task-service';

describe('LocalTaskService', () => {
  let service: LocalTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

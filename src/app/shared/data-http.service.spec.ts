import { TestBed } from '@angular/core/testing';

import { DataHttpService } from './data-http.service';

describe('DataHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataHttpService = TestBed.get(DataHttpService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CervezadbService } from './cervezadb.service';

describe('CervezadbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CervezadbService = TestBed.get(CervezadbService);
    expect(service).toBeTruthy();
  });
});

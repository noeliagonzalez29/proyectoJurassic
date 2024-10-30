import { TestBed } from '@angular/core/testing';

import { DinosauriosService } from './dinosaurios.service';

describe('DinosauriosService', () => {
  let service: DinosauriosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DinosauriosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

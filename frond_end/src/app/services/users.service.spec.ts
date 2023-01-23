import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

<<<<<<< HEAD


=======
>>>>>>> e49cae5b0247a1c5f83a50b40bbed06b7fbec124
describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

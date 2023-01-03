import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';

<<<<<<< HEAD
=======


>>>>>>> 7542b6dc02078a40ce190e82ffca5ab088a5a949
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

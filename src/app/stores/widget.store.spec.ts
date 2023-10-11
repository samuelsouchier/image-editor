import { TestBed } from '@angular/core/testing';

import { WidgetStore } from './widget.store';

describe('WidgetStoreService', () => {
  let service: WidgetStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

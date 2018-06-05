import { TestBed } from '@angular/core/testing';
import { SidebarService } from './sidebar.service';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarService]
    });

    service = TestBed.get(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start out closed', () => {
    service.open$.subscribe(next => {
      expect(next).toBe(false);
    });
  });

  describe('#open', () => {
    it('should be open', () => {
      let isOpen = false;
      service.open$.subscribe(next => (isOpen = next));
      expect(isOpen).toBeFalsy();
      service.open();
      expect(isOpen).toBeTruthy();
    });
  });

  describe('#close', () => {
    it('should set closed', () => {
      let isOpen = false;
      service.open$.subscribe(next => (isOpen = next));
      service.open();
      expect(isOpen).toBeTruthy();
      service.close();
      expect(isOpen).toBeFalsy();
    });
  });

  describe('#toggle', () => {
    it('should toggle state', () => {
      let isOpen = false;
      service.open$.subscribe(next => (isOpen = next));

      service.toggle();
      expect(isOpen).toBeTruthy();

      service.toggle();
      expect(isOpen).toBeFalsy();
    });
  });
});

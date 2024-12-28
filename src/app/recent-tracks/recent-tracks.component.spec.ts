import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentTracksComponent } from './recent-tracks.component';

describe('RecentTracksComponent', () => {
  let component: RecentTracksComponent;
  let fixture: ComponentFixture<RecentTracksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentTracksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

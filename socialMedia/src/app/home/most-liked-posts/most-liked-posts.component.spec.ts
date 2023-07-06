import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostLikedPostsComponent } from './most-liked-posts.component';

describe('MostLikedPostsComponent', () => {
  let component: MostLikedPostsComponent;
  let fixture: ComponentFixture<MostLikedPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostLikedPostsComponent]
    });
    fixture = TestBed.createComponent(MostLikedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

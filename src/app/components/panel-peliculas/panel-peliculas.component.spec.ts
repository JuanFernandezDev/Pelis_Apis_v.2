import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPeliculasComponent } from './panel-peliculas.component';

describe('PanelPeliculasComponent', () => {
  let component: PanelPeliculasComponent;
  let fixture: ComponentFixture<PanelPeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPeliculasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

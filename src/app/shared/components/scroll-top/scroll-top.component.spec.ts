import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ScrollTopComponent } from './scroll-top.component';

describe('ScrollTopComponent', () => {
  let component: ScrollTopComponent;
  let fixture: ComponentFixture<ScrollTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollTopComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar oculto', () => {
    expect(component.visible()).toBe(false);
    const button = fixture.nativeElement.querySelector('.scroll-top');
    expect(button).toBeFalsy();
  });

  it('debería volverse visible al scrollear más de 400px', () => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(500);
    component.onScroll();
    expect(component.visible()).toBe(true);
  });

  it('debería permanecer oculto con scroll menor a 400px', () => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(300);
    component.onScroll();
    expect(component.visible()).toBe(false);
  });

  it('debería llamar a window.scrollTo al hacer click', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    component.scrollToTop();
    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});

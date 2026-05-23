import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el año actual', () => {
    expect(component.currentYear).toBe(new Date().getFullYear());
  });

  it('debería renderizar el nombre de la marca', () => {
    const brandName = fixture.nativeElement.querySelector('.footer__brand-name');
    expect(brandName.textContent).toContain('Catálogo');
  });

  it('debería incluir link a DummyJSON', () => {
    const dummyjsonLink = fixture.nativeElement.querySelector('a[href="https://dummyjson.com"]');
    expect(dummyjsonLink).toBeTruthy();
  });

  it('debería incluir link al repositorio de GitHub', () => {
    const githubLink = fixture.nativeElement.querySelector('a[href*="github.com"]');
    expect(githubLink).toBeTruthy();
  });
});

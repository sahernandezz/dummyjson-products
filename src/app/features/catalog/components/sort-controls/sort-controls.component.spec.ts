import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { SortControlsComponent, SortOption } from './sort-controls.component';

describe('SortControlsComponent', () => {
  let component: SortControlsComponent;
  let fixture: ComponentFixture<SortControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortControlsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SortControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener sort por defecto "default"', () => {
    expect(component.currentSort).toBe('default');
  });

  it('debería emitir el evento sortChange al cambiar', () => {
    vi.spyOn(component.sortChange, 'emit');

    const select = fixture.nativeElement.querySelector('select');
    select.value = 'price-asc';
    select.dispatchEvent(new Event('change'));

    expect(component.sortChange.emit).toHaveBeenCalledWith('price-asc');
  });

  it('debería renderizar todas las opciones de ordenamiento', () => {
    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toBe(5);
  });
});

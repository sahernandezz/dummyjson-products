import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar sin toasts', () => {
    expect(service.toasts().length).toBe(0);
  });

  it('debería agregar un toast de tipo success', () => {
    service.show('Producto agregado');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Producto agregado');
    expect(service.toasts()[0].type).toBe('success');
  });

  it('debería agregar un toast de tipo error', () => {
    service.show('Algo falló', 'error');
    expect(service.toasts()[0].type).toBe('error');
  });

  it('debería eliminar un toast manualmente', () => {
    service.show('Mensaje');
    const id = service.toasts()[0].id;
    service.dismiss(id);
    expect(service.toasts().length).toBe(0);
  });

  it('debería auto-dismiss después de 3 segundos', () => {
    service.show('Mensaje temporal');
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(3000);

    expect(service.toasts().length).toBe(0);
  });

  it('debería manejar múltiples toasts', () => {
    service.show('Primero');
    service.show('Segundo');
    service.show('Tercero');
    expect(service.toasts().length).toBe(3);
  });
});

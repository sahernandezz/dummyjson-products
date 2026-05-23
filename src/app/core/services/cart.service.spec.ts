import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    id: 1,
    title: 'Producto de prueba',
    description: 'Descripción test',
    category: 'test',
    price: 49.99,
    discountPercentage: 10,
    rating: 4.5,
    stock: 20,
    tags: ['test'],
    brand: 'TestBrand',
    sku: 'SKU001',
    weight: 100,
    dimensions: { width: 10, height: 5, depth: 3 },
    warrantyInformation: '1 year',
    shippingInformation: 'Ships in 3 days',
    availabilityStatus: 'In Stock',
    reviews: [],
    returnPolicy: '30 days',
    minimumOrderQuantity: 1,
    meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
    images: ['https://example.com/img.jpg'],
    thumbnail: 'https://example.com/thumb.jpg'
  };

  const anotherProduct: Product = {
    ...mockProduct,
    id: 2,
    title: 'Segundo producto',
    price: 29.99
  };

  beforeEach(() => {
    // limpiar localStorage para que el service inicie limpio
    localStorage.clear();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar con el carrito vacío', () => {
    expect(service.items().length).toBe(0);
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
  });

  it('debería agregar un producto al carrito', () => {
    service.addToCart(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].product.id).toBe(1);
    expect(service.items()[0].quantity).toBe(1);
  });

  it('debería incrementar la cantidad si el producto ya existe', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].quantity).toBe(2);
  });

  it('debería manejar múltiples productos distintos', () => {
    service.addToCart(mockProduct);
    service.addToCart(anotherProduct);
    expect(service.items().length).toBe(2);
  });

  it('debería calcular el total de items correctamente', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    service.addToCart(anotherProduct);
    expect(service.totalItems()).toBe(3);
  });

  it('debería calcular el precio total correctamente', () => {
    service.addToCart(mockProduct); // 49.99
    service.addToCart(anotherProduct); // 29.99
    const expected = 49.99 + 29.99;
    expect(service.totalPrice()).toBeCloseTo(expected, 2);
  });

  it('debería eliminar un producto del carrito', () => {
    service.addToCart(mockProduct);
    service.addToCart(anotherProduct);
    service.removeFromCart(1);
    expect(service.items().length).toBe(1);
    expect(service.items()[0].product.id).toBe(2);
  });

  it('debería actualizar la cantidad de un producto', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(1, 5);
    expect(service.items()[0].quantity).toBe(5);
  });

  it('debería eliminar el producto si la cantidad es 0 o menor', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(1, 0);
    expect(service.items().length).toBe(0);
  });

  it('debería vaciar el carrito completo', () => {
    service.addToCart(mockProduct);
    service.addToCart(anotherProduct);
    service.clearCart();
    expect(service.items().length).toBe(0);
    expect(service.totalItems()).toBe(0);
  });

  it('debería abrir y cerrar el carrito', () => {
    expect(service.isCartOpen()).toBe(false);
    service.openCart();
    expect(service.isCartOpen()).toBe(true);
    service.closeCart();
    expect(service.isCartOpen()).toBe(false);
  });

  it('debería alternar el estado del carrito con toggleCart', () => {
    service.toggleCart();
    expect(service.isCartOpen()).toBe(true);
    service.toggleCart();
    expect(service.isCartOpen()).toBe(false);
  });

  // ============================================
  // Persistencia en localStorage
  // ============================================

  describe('persistencia', () => {
    it('debería guardar el carrito en localStorage al agregar', async () => {
      service.addToCart(mockProduct);
      // el effect corre asincrónicamente
      await new Promise(resolve => setTimeout(resolve, 0));
      const raw = localStorage.getItem('cart_v1');
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw!);
      expect(parsed.length).toBe(1);
      expect(parsed[0].product.id).toBe(1);
    });

    it('debería restaurar el carrito desde localStorage al recargar', () => {
      // Simulamos un estado previo guardado
      localStorage.setItem('cart_v1', JSON.stringify([
        { product: mockProduct, quantity: 3 }
      ]));

      // Recreamos el servicio (como si fuera un refresh)
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(CartService);

      expect(freshService.items().length).toBe(1);
      expect(freshService.items()[0].quantity).toBe(3);
      expect(freshService.totalItems()).toBe(3);
    });

    it('debería iniciar vacío si localStorage tiene JSON corrupto', () => {
      localStorage.setItem('cart_v1', 'not-valid-json{');

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(CartService);

      expect(freshService.items().length).toBe(0);
    });

    it('debería filtrar items inválidos al cargar', () => {
      // Mezcla de items válidos e inválidos
      localStorage.setItem('cart_v1', JSON.stringify([
        { product: mockProduct, quantity: 2 },
        { product: null, quantity: 1 },
        { quantity: 5 }, // sin product
        { product: anotherProduct, quantity: 0 }, // quantity inválida
        { product: anotherProduct, quantity: 1 }
      ]));

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({});
      const freshService = TestBed.inject(CartService);

      expect(freshService.items().length).toBe(2);
    });

    it('debería actualizar localStorage al vaciar el carrito', async () => {
      service.addToCart(mockProduct);
      service.clearCart();
      await new Promise(resolve => setTimeout(resolve, 0));

      const raw = localStorage.getItem('cart_v1');
      expect(JSON.parse(raw!)).toEqual([]);
    });
  });
});

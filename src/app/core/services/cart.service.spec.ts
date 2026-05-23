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
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.clearCart(); // limpiar entre tests
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
});

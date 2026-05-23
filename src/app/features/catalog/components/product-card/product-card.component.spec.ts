import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../../../core/models/product.model';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    category: 'electronics',
    price: 99.99,
    discountPercentage: 15,
    rating: 4.5,
    stock: 10,
    tags: ['test'],
    brand: 'TestBrand',
    sku: 'SKU001',
    weight: 200,
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el título del producto', () => {
    const title = fixture.nativeElement.querySelector('.product-card__title');
    expect(title.textContent).toContain('Test Product');
  });

  it('debería mostrar la categoría del producto', () => {
    const category = fixture.nativeElement.querySelector('.product-card__category');
    expect(category.textContent).toContain('electronics');
  });

  it('debería emitir addToCart al hacer clic en el botón', () => {
    vi.spyOn(component.addToCart, 'emit');
    const button = fixture.nativeElement.querySelector('.product-card__cart-btn');
    button.click();
    expect(component.addToCart.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('debería marcar el botón como disabled si stock es 0', () => {
    // Recrear el componente con stock 0 para que OnPush lo detecte
    const fix = TestBed.createComponent(ProductCardComponent);
    fix.componentInstance.product = { ...mockProduct, stock: 0 };
    fix.detectChanges();
    const button = fix.nativeElement.querySelector('.product-card__cart-btn') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
  });

  it('debería mostrar el badge de descuento cuando es mayor a 5%', () => {
    const badge = fixture.nativeElement.querySelector('.product-card__badge');
    expect(badge).toBeTruthy();
    expect(badge.textContent).toContain('-15%');
  });
});

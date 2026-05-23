import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { ProductsResponse } from '../models/api-response.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockResponse: ProductsResponse = {
    products: [
      {
        id: 1,
        title: 'iPhone 9',
        description: 'An apple mobile',
        category: 'smartphones',
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        tags: ['smartphones'],
        brand: 'Apple',
        sku: 'SKU001',
        weight: 174,
        dimensions: { width: 7, height: 14, depth: 0.7 },
        warrantyInformation: '1 year',
        shippingInformation: 'Ships in 3 days',
        availabilityStatus: 'In Stock',
        reviews: [],
        returnPolicy: '30 days',
        minimumOrderQuantity: 1,
        meta: { createdAt: '', updatedAt: '', barcode: '', qrCode: '' },
        images: ['https://example.com/img.jpg'],
        thumbnail: 'https://example.com/thumb.jpg'
      }
    ],
    total: 194,
    skip: 0,
    limit: 20
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // verificar que no haya requests pendientes
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener productos con paginación', () => {
    service.getProducts(20, 0).subscribe(response => {
      expect(response.products.length).toBe(1);
      expect(response.total).toBe(194);
    });

    const req = httpMock.expectOne(
      'https://dummyjson.com/products?limit=20&skip=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería obtener un producto por ID', () => {
    service.getProductById(1).subscribe(product => {
      expect(product.id).toBe(1);
      expect(product.title).toBe('iPhone 9');
    });

    const req = httpMock.expectOne('https://dummyjson.com/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse.products[0]);
  });

  it('debería obtener las categorías', () => {
    const mockCategories = ['smartphones', 'laptops', 'fragrances'];

    service.getCategories().subscribe(cats => {
      expect(cats.length).toBe(3);
      expect(cats).toContain('smartphones');
    });

    const req = httpMock.expectOne(
      'https://dummyjson.com/products/category-list'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCategories);
  });

  it('debería cachear las categorías en la segunda llamada', () => {
    const mockCategories = ['smartphones', 'laptops'];

    // primera llamada
    service.getCategories().subscribe();
    const req1 = httpMock.expectOne('https://dummyjson.com/products/category-list');
    req1.flush(mockCategories);

    // segunda llamada - no debería hacer otra petición
    service.getCategories().subscribe(cats => {
      expect(cats.length).toBe(2);
    });

    httpMock.expectNone('https://dummyjson.com/products/category-list');
  });

  it('debería filtrar productos por categoría', () => {
    service.getProductsByCategory('smartphones', 20, 0).subscribe(response => {
      expect(response.products.length).toBe(1);
    });

    const req = httpMock.expectOne(
      'https://dummyjson.com/products/category/smartphones?limit=20&skip=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('debería buscar productos por texto', () => {
    service.searchProducts('phone', 20, 0).subscribe(response => {
      expect(response.products.length).toBe(1);
    });

    const req = httpMock.expectOne(
      'https://dummyjson.com/products/search?q=phone&limit=20&skip=0'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});

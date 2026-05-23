import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly apiUrl = 'https://dummyjson.com/products';
  private categoriesCache$: Observable<string[]> | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Obtiene productos con paginación
   */
  getProducts(limit: number = 20, skip: number = 0): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  /**
   * Obtiene un producto por su ID
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene la lista de categorías (con cache)
   */
  getCategories(): Observable<string[]> {
    if (!this.categoriesCache$) {
      this.categoriesCache$ = this.http
        .get<string[]>(`${this.apiUrl}/category-list`)
        .pipe(shareReplay(1));
    }
    return this.categoriesCache$;
  }

  /**
   * Obtiene productos filtrados por categoría
   */
  getProductsByCategory(category: string, limit: number = 20, skip: number = 0): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<ProductsResponse>(
      `${this.apiUrl}/category/${category}`,
      { params }
    );
  }

  /**
   * Busca productos por texto
   */
  searchProducts(query: string, limit: number = 20, skip: number = 0): Observable<ProductsResponse> {
    const params = new HttpParams()
      .set('q', query)
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<ProductsResponse>(`${this.apiUrl}/search`, { params });
  }
}

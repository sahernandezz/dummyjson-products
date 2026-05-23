import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCop',
  standalone: true
})
export class CurrencyCopPipe implements PipeTransform {
  /**
   * Convierte USD a COP con formato de moneda colombiana
   * Tasa aproximada: 1 USD = 4,200 COP
   */
  transform(value: number | null | undefined, showSymbol: boolean = true): string {
    if (value == null || isNaN(value)) {
      return showSymbol ? '$ 0' : '0';
    }

    const cop = Math.round(value * 4200);
    const formatted = cop.toLocaleString('es-CO');

    return showSymbol ? `$ ${formatted}` : formatted;
  }
}

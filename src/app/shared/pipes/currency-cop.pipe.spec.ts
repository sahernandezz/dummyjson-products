import { CurrencyCopPipe } from './currency-cop.pipe';

describe('CurrencyCopPipe', () => {
  let pipe: CurrencyCopPipe;

  beforeEach(() => {
    pipe = new CurrencyCopPipe();
  });

  it('debería crear el pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('debería convertir USD a COP con símbolo', () => {
    const result = pipe.transform(10);
    // 10 * 4200 = 42000
    expect(result).toContain('42');
    expect(result).toContain('$');
  });

  it('debería convertir sin símbolo cuando se indica', () => {
    const result = pipe.transform(10, false);
    expect(result).not.toContain('$');
  });

  it('debería manejar valores null', () => {
    const result = pipe.transform(null);
    expect(result).toBe('$ 0');
  });

  it('debería manejar valores undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('$ 0');
  });

  it('debería manejar el valor 0', () => {
    const result = pipe.transform(0);
    expect(result).toBe('$ 0');
  });

  it('debería manejar valores negativos', () => {
    const result = pipe.transform(-5);
    expect(result).toContain('-');
  });
});

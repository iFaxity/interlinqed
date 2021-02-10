import { Predicate } from './shared';

/**
 * @interface
 * @private
 */
export interface Expression<T = unknown> extends Predicate<T> {
  /* Get the internal predicate of the expression */
  readonly _predicate: Expression<T>|null;
  /* Raw predicate of this expression */
  readonly Predicate: Predicate<T>;

  /* DefaultExpression for the predicate */
  readonly DefaultExpression: Expression<T>;

  /**
   * Adds an And predicate to the end of the {@link PredicateBuilder}
   * @param predicate - Predicate to add onto the builder chain
   */
  And(predicate: Predicate<T>): Expression<T>;
  And<U>(predicate: Predicate<T>): Expression<U>;

  /**
   * Adds an Or predicate to the end of the {@link PredicateBuilder}
   * @param predicate - Predicate to add onto the builder chain
   */
  Or(predicate: Predicate<T>): Expression<T>;
  Or<U>(predicate: Predicate<T>): Expression<U>;
}

/**
 * Helper function to ensure the predicate is an expression
 * @param predicate - Predicate to mutate the expression for
 * @returns The created Expression
 * @private
 */
function createExpression<T>(predicate: Expression<T>|Predicate<T>): Expression<T> {
  return Object.prototype.isPrototypeOf.call(PredicateExpression, predicate)
    ? (predicate as Expression<T>)._predicate // get the raw predicate of the expression
    : Object.setPrototypeOf(predicate, PredicateExpression);
}

/**
 * Base prototype for Expression
 * @private
 */
const PredicateExpression: Expression = Object.defineProperties(Object.create(Function), {
  And: {
    value(predicate: Predicate) {
      return createExpression((x, y) => !!(this(x, y) && predicate(x, y)));
    },
  },
  Or: {
    value(predicate: Predicate) {
      return createExpression((x, y) => !!(this(x, y) || predicate(x, y)));
    },
  },
});

/**
* Starts an expression
* @param expression - Default expression, could be a boolean indicating the default return value
* @returns The started expression
*/
export function New<T = unknown>(expression?: boolean): Expression<T>;
export function New<T = unknown>(expression?: Predicate<T>): Expression<T>;
export function New<T = unknown>(expression?: Predicate<T>|boolean): Expression<T> {
  let current = typeof expression == 'function' ? createExpression(expression) : null;
  const defaultExpression = createExpression<T>(expression === true
    ? () => true
    : () => false);

  const expr = createExpression<T>((item, idx) => !!(current ?? defaultExpression)(item, idx));
  return Object.defineProperties(expr, {
    _predicate: {
      get: () => current,
    },
    Predicate: {
      get: () => current ?? defaultExpression,
    },
    DefaultExpression: {
      value: defaultExpression,
    },
    And: {
      value(predicate: Predicate) {
        current = current?.And(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
    Or: {
      value(predicate: Predicate) {
        current = current?.Or(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
  });
}

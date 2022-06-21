import { Predicate } from './shared';

/**
 * @interface
 * @private
 */
export interface Expression<T = any> extends Predicate<T> {
  /**
   * Adds an And predicate to the end of the {@link PredicateBuilder}
   * @param predicate - Predicate to add onto the builder chain
   */
  And(predicate: Predicate<T>): Expression<T>;

  /**
   * Adds an Or predicate to the end of the {@link PredicateBuilder}
   * @param predicate - Predicate to add onto the builder chain
   */
  Or(predicate: Predicate<T>): Expression<T>;
}

/**
 * Helper function to ensure the predicate is an expression
 * @param predicate - Predicate to mutate the expression for
 * @returns The created Expression
 * @private
 */
function createExpression<T>(predicate: Predicate<T>): Expression<T> {
  return Object.prototype.isPrototypeOf.call(PredicateExpression, predicate)
    ? predicate
    : Object.setPrototypeOf(predicate, PredicateExpression);
}

/**
 * Base prototype for Expression
 * @private
 */
export const PredicateExpression: Expression = Object.defineProperties(Object.create(Function), {
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
export function New<T = any>(expression?: boolean): Expression<T>;
export function New<T = any>(expression?: Predicate<T>): Expression<T>;
export function New<T = any>(expression?: Predicate<T>|boolean): Expression<T> {
  let current = typeof expression == 'function' ? createExpression(expression) : null;
  const defaultExpression: Predicate = expression === true
    ? () => true
    : () => false;

  const expr = createExpression<T>((item, idx) => !!(current ?? defaultExpression)(item, idx));

  return Object.defineProperties(expr, {
    And: {
      value(predicate: Predicate<T>) {
        current = current?.And(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
    Or: {
      value(predicate: Predicate<T>) {
        current = current?.Or(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
  });
}

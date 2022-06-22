import { Predicate } from './types';

export interface Expression<T = any> extends Predicate<T> {
  /**
   * Adds an And predicate to the end of the expression.
   * @param predicate - Predicate to add onto the builder chain.
   */
  and(predicate: Predicate<T>): Expression<T>;

  /**
   * Adds an And predicate to the end of the expression.
   * @param predicate - Predicate to add onto the builder chain.
   */
  or(predicate: Predicate<T>): Expression<T>;
}

/**
 * Base prototype for Expression
 * @private
 */
const PredicateExpression: Expression = Object.defineProperties(Object.create(Function), {
  and: {
    value(predicate: Predicate) {
      return createExpression((x, y) => !!(this(x, y) && predicate(x, y)));
    },
  },
  or: {
    value(predicate: Predicate) {
      return createExpression((x, y) => !!(this(x, y) || predicate(x, y)));
    },
  },
});

/**
 * Helper function to ensure the predicate is an expression
 * @param predicate - Predicate to mutate the expression for
 * @returns The created Expression
 * @private
 */
export function createExpression<T>(predicate: Predicate<T>): Expression<T> {
  return Object.prototype.isPrototypeOf.call(PredicateExpression, predicate)
    ? predicate
    : Object.setPrototypeOf(predicate, PredicateExpression);
}

/**
* Creates a predicate expression
* @param expression - Default expression, could be a boolean indicating the default return value
* @returns The started expression
*/
export function predicate<T = any>(expression?: boolean): Expression<T>;
export function predicate<T = any>(expression?: Predicate<T>): Expression<T>;
export function predicate<T = any>(expression?: Predicate<T>|boolean): Expression<T> {
  let current = typeof expression == 'function' ? createExpression(expression) : null;
  const defaultExpression: Predicate = expression === true
    ? () => true
    : () => false;

  const expr = createExpression<T>((item, idx) => !!(current ?? defaultExpression)(item, idx));

  return Object.defineProperties(expr, {
    And: {
      value(predicate: Predicate<T>) {
        current = current?.and(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
    Or: {
      value(predicate: Predicate<T>) {
        current = current?.or(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
  });
}

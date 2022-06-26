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
 * 
 * @param value 
 * @returns
 * @internal
 */
function defaultPredicate<T>(value: any): Predicate<T> {
  return value === true
    ? () => true
    : () => false;
}

/**
 * Base prototype for Expression
 * @internal
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
 * @internal
 */
function createExpression<T>(predicate: Predicate<T>): Expression<T> {
  return Object.prototype.isPrototypeOf.call(PredicateExpression, predicate)
    ? predicate
    : Object.setPrototypeOf(predicate, PredicateExpression);
}

/**
* Creates a predicate expression
* @param expression - Default expression, could be a boolean indicating the default return value
* @returns The started expression
*/
export function createPredicate<T>(expression?: boolean|null): Expression<T>;
export function createPredicate<T>(expression?: Predicate<T>): Expression<T>;
export function createPredicate<T>(expression?: Predicate<T>|boolean): Expression<T> {
  let current = typeof expression == 'function'
    ? createExpression(expression)
    : null;

  const expr = createExpression<T>((item, idx) => !!(current ?? defaultPredicate(expression))(item, idx));

  return Object.defineProperties(expr, {
    and: {
      value(predicate: Predicate<T>) {
        current = current?.and(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
    or: {
      value(predicate: Predicate<T>) {
        current = current?.or(predicate) ?? createExpression(predicate);
        return expr;
      },
    },
  });
}

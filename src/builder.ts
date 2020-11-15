import { Predicate } from './shared';

interface Expression<T = any> extends Predicate<T> {
  And(predicate: Predicate<T>): Expression<T>;
  Or(predicate: Predicate<T>): Expression<T>;
}

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

function createExpression<T>(predicate: Predicate<T>): Expression<T> {
  return Object.prototype.isPrototypeOf.call(PredicateExpression, predicate)
    ? predicate
    : Object.setPrototypeOf(predicate, PredicateExpression);
}

/**
* Creates a new Expression on which to build predicates on
*/
export function New<T = any>(expression?: boolean): Expression<T>;
export function New<T = any>(expression?: Predicate<T>): Expression<T>;
export function New<T = any>(expression?: Predicate<T>|boolean): Expression<T> {
  let current = typeof expression == 'function' ? createExpression(expression) : null;
  const defaultExpression: Predicate = expression === true
    ? () => true
    : () => false;

  const expr = createExpression((item, idx) => !!(current ?? defaultExpression)(item, idx));
  return Object.defineProperties(expr, {
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

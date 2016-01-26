import {Type, isPresent, isBlank} from 'angular2/src/facade/lang';
import {Predicate} from 'angular2/src/facade/collection';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {DebugElement} from 'angular2/core';

/**
 * Predicates for use with {@link DebugElement}'s query functions.
 */
export class By {
  /**
   * Match all elements.
   *
   * ## Example
   *
   * {@example platform/dom/debug/ts/by/by.ts region='by_all'}
   */
  static all(): Predicate<DebugElement> { return (debugElement) => true; }

  /**
   * Match elements by the given CSS selector.
   *
   * ## Example
   *
   * {@example platform/dom/debug/ts/by/by.ts region='by_css'}
   */
  static css(selector: string): Predicate<DebugElement> {
    return (debugElement) => {
      return isPresent(debugElement.nativeElement) ?
                 DOM.elementMatches(debugElement.nativeElement, selector) :
                 false;
    };
  }

  /**
   * Match elements that have the given directive present.
   *
   * ## Example
   *
   * {@example platform/dom/debug/ts/by/by.ts region='by_directive'}
   */
  static directive(type: Type): Predicate<DebugElement> {
    return (debugElement) => { return debugElement.hasDirective(type); };
  }
}

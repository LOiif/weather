export function removeClass(el: Element | null, className: string) {
  if (el?.classList.contains(className)) {
    el?.classList.remove(className);
  }
}

export function changeModifier(
  element: Element | null,
  className: string,
  modifierToRemove: string,
  modifierToAdd: string
) {
  removeClass(element, className + modifierToRemove);
  element?.classList.add(`${className + modifierToAdd}`);
}

export function animateShowAndHide(showElem: Element | null, hideElem: Element | null, className: string) {
  hideElem?.classList.add(className);
  setTimeout(() => {
    removeClass(showElem, className);
  }, 500);
}

export function animateGradient<T>(
  element: Element | null,
  classToRemove: string,
  classToAdd: string,
  callback: () => T
) {
  setTimeout(() => {
    removeClass(element, classToRemove);
    element?.classList.add(classToAdd);

    setTimeout(() => {
      removeClass(element, classToAdd);
      callback();
    }, 1000);
  }, 200);
}

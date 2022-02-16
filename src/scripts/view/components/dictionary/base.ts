class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag = 'div') {
    this.element = document.createElement(tag);
  }
}

const elementBaseComponent = (tag = 'div', classes: string[], children?: HTMLElement[]) => {
  const element = new BaseComponent(tag);
  const classesElement = classes.join(' ');
  element.element.className = classesElement;
  children.forEach((child: HTMLElement) => {
    element.element.append(child);
  });

  return element;
};

export { BaseComponent, elementBaseComponent };

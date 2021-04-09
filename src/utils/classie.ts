function classReg(className) {
  return new RegExp('(^|\\s+)' + className + '(\\s+|$)');
}

let hasClass, addClass, removeClass;

if ('classList' in document.documentElement) {
  hasClass = function (elem, c) {
    return elem.classList.contains(c);
  };
  addClass = function (elem, c) {
    elem.classList.add(c);
  };
  removeClass = function (elem, c) {
    elem.classList.remove(c);
  };
} else {
  hasClass = function (elem, c) {
    return classReg(c).test(elem.className);
  };
  addClass = function (elem, c) {
    if (!hasClass(elem, c)) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function (elem, c) {
    elem.className = elem.className.replace(classReg(c), ' ');
  };
}

function toggleClass(elem, c) {
  let fn = hasClass(elem, c) ? removeClass : addClass;
  fn(elem, c);
}

export let classie = {
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass,
};

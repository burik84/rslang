// https://codepen.io/karpovsystems/pen/VwKdoe
import { IPagination } from '../../shared/interface';
import { controllers } from '../../controllers/controller';
/* * * * * * * * * * * * * * * * *
 * pagination
 * javascript page navigation
 * * * * * * * * * * * * * * * * */

const pagination: IPagination = {
  code: '',
  size: 30,
  page: 1,
  step: 3,

  // --------------------
  // Utility
  // --------------------

  // converting initialize data
  extend: (data) => {
    // data = data || {};
    pagination.size = data.size || pagination.size;
    pagination.page = data.page || pagination.page;
    pagination.step = data.step || pagination.step;
  },

  // add pages by number (from [s] to [f])
  add: function (start, finish) {
    for (let i = start; i < finish; i += 1) {
      pagination.code += '<a>' + i + '</a>';
    }
  },

  // add last page with separator
  last: function () {
    pagination.code += '<i>...</i><a>' + pagination.size + '</a>';
  },

  // add first page with separator
  first: function () {
    pagination.code += '<a>1</a><i>...</i>';
  },

  // --------------------
  // Handlers
  // --------------------

  // change page
  click: function () {
    pagination.page = +this.innerHTML;
    controllers.wordsPage = pagination.page;
    pagination.start();
    controllers.getDataWords();
  },

  // previous page
  prev: function () {
    pagination.page--;
    if (pagination.page < 1) {
      pagination.page = 1;
    }
    pagination.start();
    controllers.wordsPage = pagination.page;
    controllers.getDataWords();
  },

  // next page
  next: function () {
    pagination.page++;
    if (pagination.page > pagination.size) {
      pagination.page = pagination.size;
    }
    pagination.start();
    controllers.wordsPage = pagination.page;
    controllers.getDataWords();
  },

  // --------------------
  // Script
  // --------------------

  // binding pages
  bind: function () {
    const links: HTMLCollection = pagination.element.getElementsByTagName('a');
    for (let i = 0; i < links.length; i += 1) {
      if (+links[i].innerHTML === pagination.page) links[i].className = 'current';
      links[i].addEventListener('click', pagination.click, false);
    }
  },

  // write pagination
  finish: function () {
    pagination.element.innerHTML = pagination.code;
    pagination.code = '';
    pagination.bind();
  },

  // find pagination type
  start: function () {
    if (pagination.size < pagination.step * 2 + 6) {
      pagination.add(1, pagination.size + 1);
    } else if (pagination.page < pagination.step * 2 + 1) {
      pagination.add(1, pagination.step * 2 + 4);
      pagination.last();
    } else if (pagination.page > pagination.size - pagination.step * 2) {
      pagination.first();
      pagination.add(pagination.size - pagination.step * 2 - 2, pagination.size + 1);
    } else {
      pagination.first();
      pagination.add(pagination.page - pagination.step, pagination.page + pagination.step + 1);
      pagination.last();
    }
    pagination.finish();
  },

  // --------------------
  // Initialization
  // --------------------

  // binding buttons
  buttons: function (element) {
    const nav = element.getElementsByTagName('a');
    nav[0].addEventListener('click', pagination.prev, false);
    nav[1].addEventListener('click', pagination.next, false);
  },

  // create skeleton
  create: function (element) {
    const html = [
      '<a>&#9668;</a>', // previous button
      '<span></span>', // pagination container
      '<a>&#9658;</a>', // next button
    ];

    element.innerHTML = html.join('');
    pagination.element = element.getElementsByTagName('span')[0];
    pagination.buttons(element);
  },

  // init
  init: function (element, data) {
    pagination.extend(data);
    pagination.create(element);
    pagination.start();
  },

  //render
  // render:function (data) {
  //   pagination.extend(data);
  //   pagination.start();
  // }
};

export { pagination };

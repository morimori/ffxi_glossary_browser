var document = {
  getElementById: function(){},
  createComment: function(){},
  documentElement: {
    insertBefore: function(){},
    removeChild: function(){}
  },
  createElement: function(elm){
    return {
      innerHTML: '',
      appendChild: function(){},
      getElementsByTagName: function(){ return {}; },
      style: {}
    };
  }
};
var window = {
  document: document,
  XMLHttpRequest: function(){}
};
var navigator = { userAgent: "" };
var location = { href: '' };

Ti.include('utils/jquery-1.4.4.js');

var jQuery = window.jQuery;
var $ = jQuery;


window.NT = {
    pages: {}
};
require('pageify');



var $  = window.jQuery = require('jquery');
var io = require('socket.io-client');

var attachFastClick = require('fastclick');
attachFastClick(document.body);


var bus = window.bus = require("../../node_modules/backbone-events-standalone").mixin({});

var TriggerBack = require('../../../triggerback/index');
var bus = new TriggerBack(true);

require('pageify');

var tubesComponent = require('../../components/tubes/tubes.js');
var searchComponent = require('../../components/search/search.js');
//var SearchPage = require('../search/search');
var HomePage = require('../home/home');
var StationPage = require('../station/station');
var AboutPage = require('../about/about');

window.NT.bus = bus;

// // it a page is already setup run destroy.
// page(function(context, next) {
//     var nextCalled = false;
//     if(!context.init && NT.activePage) {
//         if(NT.pages[NT.activePage].destroy) {
//             NT.pages[NT.activePage].destroy(next);
//             nextCalled = true;
//         }
//     }
//     if(!nextCalled){
//         next();
//     }
// });

$(document).ready(function() {
    new tubesComponent($('.map-wrapper'), bus);
    new searchComponent($('form.search'), bus);
//     // init all the pages.

//     NT.pages = {
//         home: new HomePage(NT, socket),
//         station: new StationPage(NT, socket),
// //        search: new SearchPage(NT, socket),
//         about: new AboutPage(NT, socket)
//     };

//     page();
    bus.trigger('document:ready');
});

// allows page change to be triggered by an event.
bus.on('page:load', function(path) {
    page(path);
});

var url;
if(window.location.hostname === 'woodford.today') {
    url = 'http://www.next-tube.london/';
} else {
    url = 'http://127.0.0.1:3040/';
}

var socket = io(url);

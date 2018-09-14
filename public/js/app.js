'use strict';


window._$ = function(cl, parent) {

    let doc = parent || document,
        el = doc.querySelectorAll(cl);

    if(el && el.length > 1){
      return el;
    } else if(el){
      return el[0];
    } else {
      return null;
    }

}

import Animated from './components/paralax.js'

class App {
	constructor() {
		new Animated();

    new $shared['registration']({
      "className": 'fx-header__form',
      "headers": {
        "Content-Type": "application/json",
        "point": "dax",
      }
    })


	}
}


window.addEventListener('DOMContentLoaded', function(){
	new App()
})

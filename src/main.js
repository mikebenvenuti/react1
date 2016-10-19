/**
 * Created by Mike on 10/15/2016.
 */

//npm install --save browserify@11.0.1 reactify@1.1.1 vinyl-source-stream@1.1.0


$ = jQuery = require('jquery');
var React = require('react');
var Home = require('./components/homePage');
var Authors = require('./components/author/authorPage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');

(function(win) {
    "use strict";
    var App = React.createClass({
        render: function() {
            var Child;

            switch(this.props.route) {
                case 'about': Child = About; break;
                default: Child = Home;
            }

            return (
                <div>
                    <Header/>
                    <Child/>
                </div>
            )
        }
    });

    function render() {
        var route = win.location.hash.substr(1);
        React.render(<App route={route}/>, document.getElementById('app'));
    }

})(window)


module.exports = App;  // commonJS pattern


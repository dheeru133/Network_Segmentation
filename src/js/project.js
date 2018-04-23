/*
 * @Author: Dheeraj Chaudhary 
 * @Date: 2018-04-06 16:02:09 
 * @Last Modified by: Dheeraj.Chaudhary@contractor.hallmark.com
 * @Last Modified time: 2018-04-12 16:47:46
 */

// const jQuery = require('jquery');
jQuery(document).ready(function($) {
    console.log('Running');

    // document.getElementById('search').value = 'Sachin';
    // document.getElementById("search-form").submit();

    // console.log('hi');
    // setTimeout(function() {

    //     window.open("https://www.presearch.org/");

    // },  3000);

    // var popup = window.open('https://www.presearch.org', '_top');

    // setTimeout(function() {
    //     document.getElementById('search').value = 'Sachin';
    // }, 3000);

    // popup.onload

    // popup.onload = function() {
    // init();
    console.log('After window load');

    setTimeout(function() {
        document.getElementById('search').value = 'Sachin';
    }, 1000);
    // };
});
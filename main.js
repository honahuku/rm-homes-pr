// ==UserScript==
// @name         homesのPRを非表示にするやつ
// @namespace    http://tampermonkey.net/
// @version      0.4.3
// @description  homes.co.jpの特定のページで特定のdivを非表示にする
// @author       Honahuku
// @match        https://www.homes.co.jp/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function hidePRDivs() {
        var icons = document.querySelectorAll('span.icon');
        icons.forEach(function(icon) {
            if (icon.textContent.trim() === 'PR') {
                var parentDiv = icon.closest('div.ui-frame');
                if (parentDiv) {
                    parentDiv.style.display = 'none';
                }
            }
        });
    }

    // ページが読み込まれたら実行する
    window.addEventListener('load', function() {
        hidePRDivs();

        // searchResult要素の変更を監視する
        var observer = new MutationObserver(hidePRDivs);
        var target = document.getElementById('searchResult');
        if (target) {
            observer.observe(target, { childList: true, subtree: true });
        }
    }, false);
})();

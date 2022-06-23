// ==UserScript==
// @name         Minimal fandom.com
// @namespace    https://eliandoran.me/
// @version      0.1
// @description  Fandom.com seems a little bit crowded, so this is an opinionated script which tries to simplify the user experience as much as possible.
// @author       Elian Doran <contact@eliandoran.me>
// @match        https://*.fandom.com/*
// @icon         https://www.google.com/s2/favicons?domain=fandom.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let cssContent = "";

    function injectStyle() {
        const headEl = document.getElementsByTagName("head")[0];
        const styleEl = document.createElement("style");
        styleEl.type = "text/css";
        styleEl.innerHTML = cssContent;
        headEl.appendChild(styleEl);
    }

    function addStyle(cssSelector, style) {
        cssContent += `${cssSelector} { ${style}; }\n`;
    }

    function hideElement(cssSelector) {
        addStyle(cssSelector, "display: none !important");
    }

    // Delete global navigation bar on the left side of the page.
    function deleteGlobalNavigation() {
        hideElement(".global-navigation");
        addStyle(".fandom-sticky-header", "left: 0 !important");
    }

    function simplifyPageSideTools() {
        // Align the page side tools ("Contents", "View source") to outside the page content.
        addStyle(".page-side-tools", "transform: translateX(-100%) !important");
        // Remove the "View source" button since there is already one in the top-right of the page.
        hideElement("#ca-viewsource-side-tool");
    }

    // Removes the sidebar to the right of the page which does not bring much value.
    function removeRightRail() {
        hideElement(".page__right-rail");
    }

    // The main content is not expanded by default and there is a button to do so. Remove the button and expand the content by default.
    function expandPage() {
        const htmlEl = document.getElementsByTagName("html")[0];
        htmlEl.classList.add("is-content-expanded");

        hideElement(".page-side-tool.content-size-toggle");
    }

    function removeFloatingItems() {
        // "Wikia Bar" containing "Follow on IG", "Tik Tok" and some other strange things.
        hideElement("#WikiaBarWrapper");
    }

    // The header is floating, but it does not bring much value either. Pin it by default.
    function pinHeader() {
        addStyle(".fandom-sticky-header", "transform: translateY(100%) !important");
        addStyle(".page", "margin-top: 64px !important");
        hideElement(".community-header-wrapper");
    }

    // The footer mostly contains Fandom-related stuff instead of items related to the current wiki.
    function removeFooter() {
        hideElement(".global-footer");
    }

    // The mixed content footer does offer some current wiki-related information, but also it adds an extremely large amount of non-wiki-related content.
    function removeMixedContentFooter() {
        hideElement("#mixed-content-footer");
    }

    deleteGlobalNavigation();
    simplifyPageSideTools();
    removeRightRail();
    removeFloatingItems();
    expandPage();
    pinHeader();
    removeMixedContentFooter();
    removeFooter();

    injectStyle();
})();

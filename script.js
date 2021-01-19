(function(win, doc) {

    'use strict'

    // Header elements

    var titleFrame = doc.querySelector(".title__frame");
    var menuList = doc.querySelector(".menu__list");
    var menuBtnOutline = doc.querySelector("header > .outline");
    var menuBtn = doc.querySelector("header > nav > .btn--menu");
    var themeOutline = doc.querySelector(".theme__outline");

    // Cards & card elements

    var cards = doc.querySelectorAll('section');
    var boxFlow = doc.querySelector('#flow');
    var boxFlowNoscript = doc.querySelector('#flow > .noscript');
    var boxTime = doc.querySelector("#time");

    // Form & form elements

    var formContact = doc.querySelector('#contact');
    var formContactBtnSend = formContact.querySelector('#contact-send');
    var formContactBtnCopy = formContact.querySelector('#contact-copy');
    var formContactSummary = formContact.querySelector('.form--summary');


    // Utility functions

    var saveLocal = function(key, value) {
        if (win.localStorage) {
            win.localStorage.setItem(key, JSON.stringify(value));
        };
    };

    var restoreLocal = function(key) {
        if (win.localStorage && win.localStorage.getItem(key)) {
            return JSON.parse(win.localStorage.getItem(key));
        };
    };

    var removeLocal = function(key) {
        if (win.localStorage && win.localStorage.getItem(key)) {
            localStorage.removeItem(key);
        };
    };

    var generateRandomNumber = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var buildElementSimple = function(type, classes, text) {
        var element = doc.createElement(type);
        for (var i = 0; i < classes.length; i++) {
            element.classList.add(classes[i]);
        };
        element.innerHTML = text;
        return element;
    };

    var throttle = function(fn, delay) {
        var flag = false;
        return function() {
            if (!flag) {
                fn.apply(this, arguments);
                flag = true;
                setTimeout(function() {
                    flag = false;
                }, delay);
            };
        };
    };

    var debounce = function(fn, delay) {
        var timer = 0;
        return function() {
            var ctx = this, args = arguments;
            var debounced = function() {
                fn.apply(ctx, args);
            };
            clearTimeout(timer);
            timer = setTimeout(debounced, delay);
        };
    }

    var removeGroupClassByY = function(elements, className, offset) {
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].getBoundingClientRect().top <= win.innerHeight - offset) {
                elements[i].classList.remove(className);
            };
        };
    }


    // Responsiveness

    var getWidth = function() {
        return getComputedStyle(doc.body, '::before').content.replace(/\"/g, '');
    };

    var handleWidth = function(width) {
        if (width === "wide") {
            menuList.setAttribute('aria-expanded', 'true');
        } else if (width === "narrow" && !menuList.classList.contains("open")) {
            menuList.setAttribute('aria-expanded', 'false');
        };
    };

    // on load & resize make changes based on screen width
    handleWidth(getWidth());

    win.addEventListener('resize', debounce(function() {
        handleWidth(getWidth());
    }, 100));


    // Menu

    // on load unhide menu button & outline as js enabled
    menuBtnOutline.classList.toggle("hidden");

    // open & close menu
    menuBtn.addEventListener("click", function() {

        if (!menuList.classList.contains("open")) { //open

            titleFrame.classList.add("transparent");
            setTimeout(function() {
                titleFrame.classList.add("hidden");
                menuList.classList.remove("hidden");
                menuBtn.setAttribute('aria-pressed', 'true');
                menuList.setAttribute('aria-expanded', 'true');
                setTimeout(function() {
                    menuList.classList.add("open");
                    menuList.classList.remove("transparent");
                }, 50);
            }, 300);
            menuList.firstElementChild.firstElementChild.focus();

        } else { //close

            menuList.classList.add("transparent");
            setTimeout(function() {
                menuList.classList.remove("open");
                menuBtn.setAttribute('aria-pressed', 'false');
                menuList.setAttribute('aria-expanded', 'false');
                setTimeout(function() {
                    menuList.classList.add("hidden");
                    titleFrame.classList.remove("hidden");
                    setTimeout(function() {
                        titleFrame.classList.remove("transparent");
                    }, 100);
                }, 300);
            }, 50);
        };
    });

    // on load check theme set & change if dark
    if (restoreLocal("Settings") && restoreLocal("Settings").theme === "dark") {
        doc.body.classList.add("dark");
    };

    // toggle theme...
    var toggleTheme = function() {
        doc.body.classList.toggle("dark");
        var theme = doc.body.classList.contains("dark") ? "dark" : "light";
        saveLocal("Settings", { theme: theme });
    };

    // ... on click
    themeOutline.addEventListener("click", function() {
        toggleTheme();
    });

    // ... on keydown
    themeOutline.addEventListener("keydown", function(event) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            event.preventDefault();
            toggleTheme();
        };
    });


    // Cards

    // on load & scroll remove card transparency
    win.addEventListener('load', throttle(function() {
        removeGroupClassByY(cards, 'transparent', 150);
    }, 100));

    win.addEventListener('scroll', throttle(function() {
        removeGroupClassByY(cards, 'transparent', 150);
    }, 100));


    // Card '#flow'

    var entries = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', // 10
        '+', '-', '&times;', '&divide;', '=', '&le;', '&ge;', '( )', '[ ]', '{ }', // 10
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', // 10
        'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', // 10
        'u', 'v', 'w', 'x', 'y', 'z', // 6
        '!', '?', '&', '*', '~', '@', '#', '%', // 8
        '&alpha;', // 31
        '&euro;',
        '&cent;',
        '&check;',
        '&copy;',
        '&cross;',
        '&dollar;',
        '&equiv;',
        '&euro;',
        '&frac14;',
        '&frac13;',
        '&frac12;',
        '&frac23;',
        '&frac34;',
        '&lambda;',
        '&micro;',
        '&para;',
        '&pi;',
        '&pound;',
        '&radic;',
        '&reg;',
        '&rtrif;',
        '&sect;',
        '&sigma;',
        '&sum;',
        '&telrec;',
        '&theta;',
        '&trade;',
        '&yen;',
        '&#8494;', // estimated
        '&#9685;'  // pie chart
    ];

    var insertRemoveSymbol = function() {

        // create element w/ randomly determined text & properties, append
        var entry = entries[generateRandomNumber(0, 84)];
        var symbol = buildElementSimple('div', ['flow__symbol'], entry);
        symbol.style.fontSize = generateRandomNumber(2.25, 3.75) + 'rem';
        symbol.style.left = generateRandomNumber(5, 78) + '%';
        boxFlow.appendChild(symbol);

        // remove element after leaving top of box
        setTimeout(function() {
            symbol.remove();
        }, 2400);
    };

    if (boxFlow) {

        // on load remove fallback elements as js enabled
        boxFlowNoscript.remove()

        // on load begin flow
        setInterval(insertRemoveSymbol, 125);
    };


    // Card #time

    var removeInsertTime = function() {

        // remove element with previous time
        boxTime.lastElementChild.remove();

        // get current time, create element, append
        var date = new Date(Date.now());
        var timeTxt = buildElementSimple('p', [], date.toLocaleTimeString());
        boxTime.append(timeTxt);
    };

    if (boxTime) {

        // on load begin time update
        setInterval(removeInsertTime, 1000);
    };


    // Form

    var addSplit = ['gmx.com', 'automate'];
    var addJoined = addSplit.reverse().join('@');

    var noteText = {
        sendSuccess: 'Email client requested...',
        copySuccess: 'Address sent to clipboard.',
        copyFailure: 'Email: ' + addJoined
    };

    var timer;

    var showFormContactSummary = function(key) {

        formContactSummary.textContent = noteText[key];

        // wait then remove ready for new
        clearTimeout(timer);
        timer = setTimeout(function() {
            formContactSummary.classList.add('transparent');
            setTimeout(function() {
                formContactSummary.textContent = '';
                formContactSummary.classList.remove('transparent');
            }, 300);
        }, 5000);
    };

    var sendAddressToEmailClient = function() {
        win.location.href = 'mailto:' + addJoined;
        showFormContactSummary('sendSuccess');
    };

    var copyAddressToClipboard = async function() {
        if (!navigator.clipboard) {
            showFormContactSummary('copyFailure');
        } else {
            try {
                await navigator.clipboard.writeText(addJoined);
                showFormContactSummary('copySuccess');
            } catch (err) {
                showFormContactSummary('copyFailure');
            };
        };
    };

    formContact.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.id == 'contact-send') {
            sendAddressToEmailClient();
        } else if (event.target.id == 'contact-copy') {
            copyAddressToClipboard();
        };
    });

})(window, document)

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined and it is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            })
        });

    });

    describe('The menu', function () {
        /* Menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element should be hidden', function () {
            expect($('body')).toHaveClass("menu-hidden");
        });


        /* Menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu element should display when hamburguer icon is clicked', function () {
            const iconListElements = document.getElementsByClassName('icon-list');
            // When click on the hamburguer icon, menu is displayed
            iconListElements[0].click();
            expect($('body')).not.toHaveClass("menu-hidden");

            // When click on the hamburguer icon again, menu is hidden
            iconListElements[0].click();
            expect($('body')).toHaveClass("menu-hidden");
        });

    });

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            // Load first feed before each test
            loadFeed(0, function () {
                done();
            })
        });

        /* Test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('when loadFeed is completed, there is at least one entry element whithin feed container', function (done) {
            expect($('.feed').length).not.toBeLessThan(1);
            // Get parent-child relationship using JQuery:
            const entries = $('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);

            // Get parent-child relationship using JS:
            // const entriesJS = document.querySelector('.feed').querySelectorAll('.entry');
            // expect(entriesJS.length).toBeGreaterThan(0);

            done();
        });
        
        it('when loadFeed is completed, every entry-link has an entry element', function (done) {
            const entryLinks = document.querySelector('.feed').querySelectorAll('.entry-link');
            entryLinks.forEach(function(entryLink) {
                expect(entryLink.getElementsByClassName('entry').length).toBeGreaterThan(0);
            })
            done();
        });
    });

    describe('New Feed Selection', function () {
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('loadFeed updates', function (done) {
            loadFeed(0, function () {
                const headerTitle = $('.header-title');
                expect(headerTitle[0].textContent).toBe('Udacity Blog');
                const beforeFeed = document.querySelector('.feed').textContent

                loadFeed(1, function () {
                    const afterFeed = document.querySelector('.feed').textContent
                    expect(afterFeed).not.toBe(beforeFeed); 
                    done();   
                });
            });
        });
    });
}());

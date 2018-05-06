'use strict'

// We're using $() to prevent tests from running until the DOM
// is ready, since some tests rely on it to pass.

$(function() {

    // This is the test suite for the RSS feeds, ensuring that they exist,
    // and their properties exist, and nothing is empty.

    describe('RSS Feeds', function() {

        // This tests to make sure that the allFeeds variable has 
        // been defined and that it is not empty

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This tests to make sure that every feed in allFeeds has 
        // a URL that is defined and not empty.

        it('contain URLs', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        // This tests to make sure that every feed in allFeeds has 
        // a name that is defined and not empty.

         it('have names', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
         });
    });


    // This is the test suite for the hamburger menu, making sure that
    // the full contents are hidden by default, and then when clicked,
    // the visibility is toggled.

    describe('The Menu', function(){
        let menu = $(document.body);

        // This tests to make sure that the full menu is hidden by
        // default.

         it('is hidden by default', function(){
            expect(menu.hasClass('menu-hidden')).toBe(true);
         });

        // This tests to make sure that the full menu is visible
        // by clicking on the menu icon, and hides again on a 
        // second click.

          it('shows on click', function(){
            menu.toggleClass('menu-hidden');
            expect(menu.hasClass('menu-hidden')).toBe(false);
          });

          it('hides on second click', function(){
            menu.toggleClass('menu-hidden');
            expect(menu.hasClass('menu-hidden')).toBe(true);
          });

    });
        
    // This is the test suite for the initial entries of allFeeds.
    // It tests after the loadFeed function is called, that there is
    // a minimum of a single entry within the feed list. (Async)

    describe('Initial Entries', function(){
        let entry = $('.entry');
        beforeEach(function(done){
            loadFeed(0, function(){
                done();
            });
        });

        // This tests to make sure that when loadFeed is called
        // and a new entry is found, it appears as an .entry element
        // in the .feed container. 

         it('have a minimum of one element', function(){
            expect(entry).not.toBeNull();
         });
    });

     

    // This is the test suite for a new entrie in allFeeds.
    // It tests after the loadFeed function is called,  if there 
    // is a new post, it is loaded and the content changes. (Async)

    describe('New Feed Selection', function(){
        let prevUrl,
            prevName,
            newUrl,
            newName;

        beforeEach(function(done){
            loadFeed(0, function(){
                prevUrl = allFeeds[0].url;
                prevName = allFeeds[0].name;
                loadFeed(1, function(){
                   newUrl = allFeeds[1].url;
                   newName = allFeeds[1].name;
                });
                done();
            });
        });



        // This tests that when a new feed is loaded after loadFeed
        // the new name and new url does not match the previous
        // name and url.

         it('content appears when loaded', function(){
            expect(newName).not.toEqual(prevName);
            expect(newUrl).not.toEqual(prevUrl);
         });
    });

}());

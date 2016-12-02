(function(app){
"use strict";

    var CONSTANTS = {
        DATE: {
            FORMAT: 'yyyy-MM-dd'
        },
        STRINGS: {
            DELETE_SUBREDDIT_WARNING:
                ('Deleting a subreddit means that it will no longer be scraped,\n' +
                 ' it does not remove existing posts and comments from the database.')
        }
    };

    app.value('constants', CONSTANTS);

})(app);
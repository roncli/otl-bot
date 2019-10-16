const config = require("../settings").tracker,
    request = require("request-promise-native");

//  #####                       #
//    #                         #
//    #    # ##    ###    ###   #   #   ###   # ##
//    #    ##  #      #  #   #  #  #   #   #  ##  #
//    #    #       ####  #      ###    #####  #
//    #    #      #   #  #   #  #  #   #      #
//    #    #       ####   ###   #   #   ###   #
/**
 * A class that handles calls to the tracker.
 */
class Tracker {
    //              #    #  #         #          #
    //              #    ####         #          #
    //  ###   ##   ###   ####   ###  ###    ##   ###
    // #  #  # ##   #    #  #  #  #   #    #     #  #
    //  ##   ##     #    #  #  # ##   #    #     #  #
    // #      ##     ##  #  #   # #    ##   ##   #  #
    //  ###
    /**
     * Gets the data for a match by ID.
     * @param {number} id The match ID to retrieve.
     * @returns {Promise<object>} A promise that resolves with the match data.
     */
    static getMatch(id) {
        return request.get({
            uri: `${config.baseUrl}/game/${id}`,
            json: true
        });
    }
}

module.exports = Tracker;

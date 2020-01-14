/**
 * @typedef {import("../models/map.types").MapData} MapTypes.MapData
 */

const Db = require("../database/map"),
    Exception = require("../logging/exception");

//  #   #
//  #   #
//  ## ##   ###   # ##
//  # # #      #  ##  #
//  #   #   ####  ##  #
//  #   #  #   #  # ##
//  #   #   ####  #
//                #
//                #
/**
 * A class that handles map-related functions.
 */
class Map {
    //                          #
    //                          #
    //  ##   ###    ##    ###  ###    ##
    // #     #  #  # ##  #  #   #    # ##
    // #     #     ##    # ##   #    ##
    //  ##   #      ##    # #    ##   ##
    /**
     * Adds a map to the OTL.
     * @param {string} map The map to add.
     * @returns {Promise} A promise that resolves when the map has been added.
     */
    static async create(map) {
        try {
            await Db.create(map);
        } catch (err) {
            throw new Exception("There was a database error adding a map.", err);
        }
    }

    //              #     ##   ##    ##     ##   ##    ##                         #
    //              #    #  #   #     #    #  #   #     #                         #
    //  ###   ##   ###   #  #   #     #    #  #   #     #     ##   #  #   ##    ###
    // #  #  # ##   #    ####   #     #    ####   #     #    #  #  #  #  # ##  #  #
    //  ##   ##     #    #  #   #     #    #  #   #     #    #  #  ####  ##    #  #
    // #      ##     ##  #  #  ###   ###   #  #  ###   ###    ##   ####   ##    ###
    //  ###
    /**
     * Gets the full list of allowed maps in the OTL.
     * @returns {Promise<string[]>} A promise that resolves with the list of maps allowed.
     */
    static async getAllAllowed() {
        try {
            return await Db.getAllAllowed();
        } catch (err) {
            throw new Exception("There was a database error getting the list of allowed maps.", err);
        }
    }

    //              #    ###   ##                         #  ###          ##
    //              #    #  #   #                         #  #  #        #  #
    //  ###   ##   ###   #  #   #     ###  #  #   ##    ###  ###   #  #   #     ##    ###   ###    ##   ###
    // #  #  # ##   #    ###    #    #  #  #  #  # ##  #  #  #  #  #  #    #   # ##  #  #  ##     #  #  #  #
    //  ##   ##     #    #      #    # ##   # #  ##    #  #  #  #   # #  #  #  ##    # ##    ##   #  #  #  #
    // #      ##     ##  #     ###    # #    #    ##    ###  ###     #    ##    ##    # #  ###     ##   #  #
    //  ###                                 #                       #
    /**
     * Gets played maps for the season.
     * @param {number} [season] The season number, or void for the latest season.
     * @returns {Promise<string[]>} The list of maps played in a season.
     */
    static async getPlayedBySeason(season) {
        try {
            return await Db.getPlayedBySeason(season);
        } catch (err) {
            throw new Exception("There was a database error getting maps played.", err);
        }
    }

    // ###    ##   # #    ##   # #    ##
    // #  #  # ##  ####  #  #  # #   # ##
    // #     ##    #  #  #  #  # #   ##
    // #      ##   #  #   ##    #     ##
    /**
     * Removes a map from the OTL.
     * @param {string} map The map to remove.
     * @returns {Promise} A promise that resolves when the map has been removed.
     */
    static async remove(map) {
        try {
            await Db.remove(map);
        } catch (err) {
            throw new Exception("There was a database error removing a map.", err);
        }
    }

    //             ##     #       #         #
    //              #             #         #
    // # #    ###   #    ##     ###   ###  ###    ##
    // # #   #  #   #     #    #  #  #  #   #    # ##
    // # #   # ##   #     #    #  #  # ##   #    ##
    //  #     # #  ###   ###    ###   # #    ##   ##
    /**
     * Validates a map with the database.
     * @param {string} map The map to validate.
     * @returns {Promise<MapTypes.MapData>} The validated map.
     */
    static async validate(map) {
        try {
            return await Db.validate(map);
        } catch (err) {
            throw new Exception("There was a database error validating a map.", err);
        }
    }
}

module.exports = Map;

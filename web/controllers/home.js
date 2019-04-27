const DiscordMarkdown = require("discord-markdown"),

    Common = require("../includes/common"),
    Teams = require("../includes/teams"),

    Discord = require("../../src/discord"),
    HomeView = require("../../public/views/home"),
    Match = require("../../src/models/match"),
    Player = require("../../src/models/player"),
    Team = require("../../src/models/team");

/**
 * @typedef {import("express").Request} Express.Request
 * @typedef {import("express").Response} Express.Response
 */

//   #   #
//   #   #
//   #   #   ###   ## #    ###
//   #####  #   #  # # #  #   #
//   #   #  #   #  # # #  #####
//   #   #  #   #  # # #  #
//   #   #   ###   #   #   ###
/**
 * A class that represents the home page.
 */
class Home {
    //              #
    //              #
    //  ###   ##   ###
    // #  #  # ##   #
    //  ##   ##     #
    // #      ##     ##
    //  ###
    /**
     * Processes the request.
     * @param {Express.Request} req The request.
     * @param {Express.Response} res The response.
     * @returns {Promise} A promise that resolves when the request is complete.
     */
    static async get(req, res) {
        const standings = await Team.getSeasonStandings(),
            stats = await Player.getTopKda(),
            matches = await Match.getCurrent(standings),
            news = (await Discord.announcementsChannel.fetchMessages({limit: 5})).map((m) => {
                m.content = DiscordMarkdown.toHTML(m.content, {discordCallback: {user: (user) => `@${Discord.findGuildMemberById(user.id).displayName}`, channel: (channel) => `#${Discord.findChannelById(channel.id).name}`, role: (role) => `@${Discord.findRoleById(role.id).name}`, emoji: () => ""}});

                return m;
            }),
            teams = new Teams();

        standings.forEach((standing) => {
            teams.getTeam(standing.teamId, standing.name, standing.tag, standing.disbanded, standing.locked);
        });

        stats.forEach((stat) => {
            teams.getTeam(stat.teamId, stat.name, stat.tag, stat.disbanded, stat.locked);
        });

        res.status(200).send(Common.page(
            /* html */`
                <link rel="stylesheet" href="/css/home.css" />
            `,
            HomeView.get({
                standings,
                stats,
                matches,
                news,
                teams
            }),
            req
        ));
    }
}

Home.route = {
    path: "/"
};

module.exports = Home;

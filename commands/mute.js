const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')

const maxReports    = 5;
const minutes       = 10;
const mutePeriod    = minutes * 60 * 1000;

class MuteCommand extends CustomCommand {
  constructor() {
    let params = {
      'name': 'mute',
      'execute': async (msg) => {
        const recipient   = utils.getFirstMentionID(msg); // Who is being reported
        const reporter    = msg.author.id;                // Who is reporting
        const server      = msg.guild.id;                 // Where are they reporting
        const time        = Date.now();                   // Time of the report

        /* -----------------------------------------------------------------
          Considerations:
            Users can only report once per server every mutePeriod.
            A mute is given when a user reaches maxReports in a server.
            Mute reports can still be given out if a user already muted.
         ----------------------------------------------------------------- */

        if(recipient === undefined) return
        // Do not allow users to report more than once every 10 minutes per server
        if(this.userReports[reporter] === undefined) this.userReports[reporter] = []
        if(this.userReports[reporter].every( (v,i,a) => ( v.time + mutePeriod < Date.now() || v.server !== server ) )) {

          // Log the report entry from the reporter
          this.userReports[reporter].push({ server: server, time: time, recipient: recipient });

          // Add the report entry to the recipient
          if(this.reports[recipient] === undefined) this.reports[recipient] = []
          this.reports[recipient].push({ server: server, time: time, reporter: reporter });

          // Count the total reports in the last 10 minutes
          const reportCount = this.reports[recipient].reduce( (acc, v) => {
            return acc + ((v.time + mutePeriod) > Date.now() && v.server === server) ? 1 : 0
          }, 0);

          // If there are enough reports, add the user to the mute list
          // and do not overwrite mutes
          if(reportCount >= maxReports) {
            // Get the servers where the user is muted
            const servers = this.mutedUsers.get(recipient) || [];

            // Append the server to the servers array
            this.mutedUsers.set(recipient, servers.concat(server));


            // Register a timeout for mutePeriod
            setTimeout(function(args){
              // Get the servers where the user is muted
              const servers = this.mutedUsers.get(args.recipient) || [];

              // Remove args.server from the servers list
              this.mutedUsers.set(args.recipient, servers.filter( (v) => v !== args.server));

            }.bind(this), mutePeriod, { recipient:recipient, server: server });
          }
        }
      }
    }
    super(params)
    this.reports       = new Array();
    this.userReports   = new Array();
    this.mutedUsers    = new Map();
  }
}

exports.getCommands = (clients) => {
  return [new MuteCommand()];
}

exports.checkMuted = (msg) => {
  return (mutedUsers[msg.author.id] || []).indexOf(msg.guild.id);
}

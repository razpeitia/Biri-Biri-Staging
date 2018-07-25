const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')

const maxReports    = 10;
const minutes       = 10;
const mutePeriod    = minutes * 60 * 1000;

const reports       = new Array();
const userReports   = new Array();
const mutedUsers    = new Array();

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'mute',
    'execute': async (msg) => {

      const recipient   = msg.mentions.members.first().user.id; // Who is being reported
      const reporter    = msg.author.id;                        // Who is reporting
      const server      = msg.server.id;                        // Where are they reporting
      const time        = Date.now();                           // Time of the report

      /* ----------------------------------------------------------------- 
        Considerations:
          Users can only report once per server every mutePeriod.
          A mute is given when a user reaches maxReports in a server.
          Mute reports can still be given out if a user already muted.
       ----------------------------------------------------------------- */

      if(reported) {
        // Do not allow users to report more than once every 10 minutes per server
        if(userReports[reporter].every( (v,i,a) => ( v.time + mutePeriod < Date.now() || v.server !== server ) )) {

          // Log the report entry from the reporter
          userReports[reporter].push({ server: server, time: time, recipient: recipient });

          // Add the report entry to the recipient
          reports[recipient].push({ server: server, time: time, reporter: reporter });

          // Count the total reports in the last 10 minutes
          const reportCount = reports.reduce( (acc, v) => {
            return acc + (v.time + mutePeriod < Date.now() && v.server === server) ? 1 : 0
          }, 0);

          // If there are enough reports, add the user to the mute list
          // and do not overwrite mutes
          if(reportCount >= maxReports && !mutedUsers[recipient]) {

              // TODO mute recipient @ server
              // Options:
              //    1. add mute roles
              //    2. delete messages on receive

              mutedUsers[recipient] = true;

            setTimeout(function(args){
                // TODO unmute args.recipient @ args.server

                this.mutedUsers[args.recipient] = true;
              }.bind(this), mutePeriod, { recipient:recipient, server: server });
          }
        }
      } else {
        return;
      }
    }
  })
  ]
}

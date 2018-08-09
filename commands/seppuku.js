const CustomCommand = require('../core/command.js').CustomCommand

const minutes       = 1; // Minutes Muted
const mutePeriod    = minutes * 60 * 1000; // Cooldown time of mute

class SeppukuCommand extends CustomCommand {
    constructor() {
        let params = {
            'name': 'seppuku',
            'execute': async (msg) => {
                const recipient   = msg.author.id;                                // Who is the pendejo
                const server      = msg.guild.id;                                 // Where are they suiciding
                const muteRole    = msg.guild.roles.find('name','Muted');         // Look for the muted role

                /* -----------------------------------------------------------------
                  Considerations:
                    Do a flip while you fall.
                 ----------------------------------------------------------------- */

                // Get the servers where the user is muted
                const servers = mutedUsers.get(recipient) || [];

                // Append the server to the servers array
                this.mutedUsers.set(recipient, servers.concat(server));

                let reply = new message.BaseMessage(msg)
                reply.setDescription(`**${msg.author.username} se suicimato**`)
                reply.setColor(0x00fd00)
                reply.setImage("https://media1.tenor.com/images/b25511087b27597960f77dd0dbaf568d/tenor.gif")
                msg.channel.send(reply)



                // Via Roles ---------- ADD ------------
                if(muteRole)
                    msg.member.addRole(muteRole.id)
                        .then(console.log)
                        .catch(console.error);
                // -------------------------------------


                // Set the argument data sent to the timer callback
                const timerArgs = {
                    recipient:recipient,
                    server: server,
                    muteRole: muteRole,
                    member: msg.member
                };


                /* ----------------------
                  Timer and Callback
                ---------------------- */

                // Register a timeout for mutePeriod
                setTimeout(function(args){
                    // Get the servers where the user is muted
                    const servers = this.mutedUsers.get(args.recipient) || [];

                    // Remove args.server from the servers list
                    this.mutedUsers.set(args.recipient, servers.filter( (v) => v !== args.server) );

                    // Via Roles -------- REMOVE -----------
                    if(args.muteRole)
                        args.member.removeRole(args.muteRole.id)
                            .then(console.log)
                            .catch(console.error);
                    // -------------------------------------

                }.bind(this), mutePeriod, timerArgs);
            }
        }
        super(params)
        this.mutedUsers  = new Map();
    }

    checkMuted(msg) {
        return (this.mutedUsers.get(msg.author.id) || []).indexOf(msg.guild.id) > -1;
    }
}

exports.getCommands = (clients) => {
    return [new SeppukuCommand()];
}

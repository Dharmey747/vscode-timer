const fs = require("fs");

class Timer {
    constructor(bar) {
        this.bar = bar
        this.sessionID = Math.floor(new Date().getTime() / 1000);
        this.refreshBar();

        this.hour = 0
        this.minute = 0
        this.second = 0
    };

    updateSession() {
        var sessions = require("./sessions.json");

        var sameSession = false;
        const closeDate = new Date();
        const parsedDate = `${closeDate.getDay()}/${closeDate.getMonth() + 1}/${closeDate.getFullYear()}`
    
        for (var date in sessions["sessions"]) {
            if (sessions["sessions"][date].sessionID == this.sessionID) {
                sameSession = true;

                sessions["sessions"][date] = {
                    sessionID: this.sessionID,
                    date: parsedDate,
                    duration: `${this.hour}h ${this.minute}min ${this.second}sec`
                }
                fs.writeFile(__dirname + '/sessions.json', JSON.stringify(sessions, null, 2), () => {});
                break;
            }
        }

        if (!(sameSession)) {
            sessions["sessions"].push({
                sessionID: this.sessionID,
                date: parsedDate,
                duration: `${this.hour}h ${this.minute}min ${this.second}sec`
            });


            fs.writeFile(__dirname + '/sessions.json', JSON.stringify(sessions, null, 2), err => {
                if (err) {
                    console.log(err)
                }
            });
        }        
    };

    handleTimer() {
        this.hour = isNaN(this.hour) ? 0 : this.hour;
        this.minute = isNaN(this.minute) ? 0 : this.minute;
        this.second = isNaN(this.second) ? 0 : this.second;

        if (this.second > 59) {
            this.second = 0
            this.minute++;
            this.updateSession();
        }

        if (this.minute > 59) {
            this.minute = 0
            this.hour++;
        }

        var parsedSecond = (this.second < 10 ? '0' : '') + this.second;
        var parsedMinute = (this.minute < 10 ? '0' : '') + this.minute;
        var parsedHour = (this.hour < 10 ? '0' : '') + this.hour;

        this.second++;
        return `${parsedHour}:${parsedMinute}:${parsedSecond}`
    };

    refreshBar() {
        this.bar.text = `${this.handleTimer()} Elapsed`;
        this.bar.show();

        setTimeout(() => {
            this.refreshBar();
        }, 1000);
    };
};

module.exports = Timer
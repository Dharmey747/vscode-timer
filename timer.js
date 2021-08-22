class Timer {
    constructor(bar) {
        this.bar = bar
        this.refreshBar();

        this.hour = 0
        this.minute = 0
        this.second = 0
    };

    handleTimer() {
        this.hour = isNaN(this.hour) ? 0 : this.hour;
        this.minute = isNaN(this.minute) ? 0 : this.minute;
        this.second = isNaN(this.second) ? 0 : this.second;

        if (this.second > 59) {
            this.second = 0
            this.minute++;
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
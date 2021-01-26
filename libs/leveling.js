class levelup {

    // Constructor
    constructor(giveExp, expLevel) {
        this.giveExp = giveExp;
        this.expLevel = expLevel;
    }

    // Get Total Exp
    getTotalExp(user) {

        // Base
        let totalexp = 0;

        // For
        for (let p = 0; p < user.level; p++) {
            if (p !== 0) {
                const numberinset = this.expLevel * p;
                totalexp = totalexp + numberinset;
            }
        }

        // Insert Result
        totalexp = totalexp + user.exp;

        // Complete
        return totalexp;

    }

    // Exp Generator
    expGenerator() {
        return Number(Math.floor(Math.random() * ((this.giveExp - 1) + 1) + 1));
    }

    // Progress
    progress(user) {
        return this.expLevel * user.level;
    }

    // Give
    give(user, extraExp = 0, type = 'add') {

        // Get the new user exp
        if (type === "add") { user.exp += this.expGenerator() + extraExp; }
        else if (type === "extra") { user.exp += extraExp; }
        this.expValidator(user);

        // Get Total Exp
        user.totalExp = this.getTotalExp(user);

        return user;

    }

    // Remove
    remove(user, extraExp = 0, type = 'add') {

        // Get the new user exp
        if (type === "add") { user.exp -= this.expGenerator() + extraExp }
        else if (type === "extra") { user.exp -= extraExp }
        this.expValidator(user);

        // Get Total Exp
        user.totalExp = this.getTotalExp(user);

        return user;

    }

    // Exp Validator
    expValidator(user) {

        // Add Level
        if (user.exp > this.expLevel * user.level) {

            user.level++;
            user.exp = 0;

        }

        // Remove Level
        else if (user.exp < 1) {

            user.level--;
            user.exp = this.expLevel * user.level;

        }

        // Complete
        return user;

    }

}

module.exports = levelup;
class levelup {

    constructor(giveExp, expLevel) {

        this.giveExp = giveExp;
        this.expLevel = expLevel;

    }

    progress(user){
        return this.expLevel * user.level;
    }

    give(user, extraExp = 0) {

        user.exp = user.exp + Number(Math.floor(Math.random() * ((this.giveExp - 1) + 1) + 1)) + extraExp;
        if (user.exp > this.expLevel * user.level) {

            user.level++;
            user.exp = 0;
        
        }
        
        // Get Exp
        var totalexp = 0;
        for (var p = 0; p < user.level; p++) {
            if (p !== 0) {
                var numberinset = this.expLevel * p;
                totalexp = totalexp + numberinset;
            }
        }
        totalexp = totalexp + user.exp;
        user.totalExp = totalexp;

        return user;

    }

}

module.exports = levelup;
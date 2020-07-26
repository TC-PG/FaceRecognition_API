
const handleRegister = (req, res , bcrypt, db) => {
    const { email, name, password } = req.body;
    if(!email|| !name|| !password){
        return res.status(400).json("資料填寫錯誤");
    }
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    db.transaction((trx) => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback);
    })
        .catch(err => res.status(400).json("發生錯誤，無法註冊"));
}

module.exports = {
    handleRegister: handleRegister
}
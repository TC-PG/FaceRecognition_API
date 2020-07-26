const handleSignin = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if(!email|| !password){
        return res.status(400).json("資料填寫錯誤");
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then((data,next) => {
           const isValidUser = bcrypt.compareSync(password, data[0].hash);           
            if(isValidUser){
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json('發生錯誤'));               
            }else{
                next(err);
            }
        })
        .catch(err => res.status(400).json('請輸入正確資訊'));

}

module.exports = {
    handleSignin: handleSignin
}
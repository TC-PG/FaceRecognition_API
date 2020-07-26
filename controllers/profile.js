const handleProfileGet = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where('id', id)
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('找不到用戶')
            }
        })
        .catch(err => res.status(400).json('發生錯誤'));
}

module.exports = {
    handleProfileGet: handleProfileGet
}
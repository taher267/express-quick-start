const createUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, New user' })
};

const allUsers = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, All users' })
};

const getUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Single user' })
};

const updateUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Update user' })
};


const updateUserActivity = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Update user Activity' })
};

const deleteUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Delete user' })
};

const forgotPassword = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Forgot Password' })
};


const resetPassword = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Reset Password' })
};

export default {
    createUser,
    allUsers,
    getUser,
    updateUser,
    updateUserActivity,
    deleteUser,
    forgotPassword,
    resetPassword
}
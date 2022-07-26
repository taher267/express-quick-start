export const createUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, New user' })
};

export const allUsers = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, All users' })
};

export const getUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Single user' })
};

export const updateUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Update user' })
};


export const updateUserActivity = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Update user Activity' })
};

export const deleteUser = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Delete user' })
};

export const forgotPassword = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Forgot Password' })
};


export const resetPassword = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Reset Password' })
};
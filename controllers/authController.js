import User from "../models/User";
import axios from 'axios';
import { v4 } from "uuid";
String.prototype.replaceAt = function (index, char) {
    let a = this.split("");
    a[index] = char;
    return a.join("");
}
export const getRegister = (req, res, nex) => {
    res.cookie('example-cookie', 'name=taher', { httpOnly: true });
    return res.render('signup');
};

export const regiserCtrl = (req, res, nex) => {
    console.log(req.cookies);
    const user = new User(req.body);
    // console.log(user);

    res.json({ msg: 'Alhamdu lillah, register Controller' })
};

export const loginCtrl = (req, res, nex) => {
    res.json({ msg: 'Alhamdu lillah, Login Controller' })
};

export const getLogin = (req, res, nex) => {
    return res.render('login');
};


export const flickerRequestTokenCtrl = async (req, res, nex) => {
    const customerKey = '969389cf00c43a96de24870c42b0e557';
    const callbackUrl = 'http://localhost:5051/auth/flicker/auth-verifier';
    const oauth_signature = uuid4().toLocaleUpperCase();
    // const oauth_nonce = 'pI8TPu';
    const oauth_timestamp = Math.round(new Date().getTime() / 1000); //'1658333521';
    /////////////////////////////////////
    const URL = `https://www.flickr.com/services/oauth/request_token?oauth_consumer_key=969389cf00c43a96de24870c42b0e557&oauth_signature_method=HMAC-SHA1&oauth_timestamp=1658335611&oauth_nonce=qxicAq&oauth_version=1.0&oauth_signature=YUlJJ8F9e1PMrN8uIAwbqmj5F50=&oauth_callback=http%3A%2F%2Flocalhost:5051/auth/flicker/auth-verifier`;

    const query = URL.split('?')[1];
    const newQry = query.split('&').reduce((acc, cur) => {
        const idx = cur.indexOf('=');
        const newStr = cur.replaceAt(idx, '|');
        // console.log(newStr);
        const newSpil = newStr.split('|');
        acc[newSpil[0]] = newSpil[1];
        return acc;
    }, {});
    const { } = newQry;
    const { oauth_signature: la, oauth_nonce, oauth_timestamp: rer } = newQry;
    /////////////////////////////////////

    try {
        const { data } = await axios.get(`https://www.flickr.com/services/oauth/request_token?oauth_consumer_key=${customerKey}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${oauth_timestamp}&oauth_nonce=${oauth_nonce}&oauth_version=1.0&oauth_signature=${oauth_signature}&oauth_callback=${callbackUrl}`);
        // 
        console.log('req.body', req.body);
        if (data) {
            res.redirect(`/auth/flicker/access-token?${data}`)
        }
        // res.render('signup');
    } catch (e) {
        console.error('error= ===========', e);
        res.render('signup');
        // nex(e)
    }
}
export const flickerAccessTokenCtrl = async (req, res, nex) => {
    try {
        const { oauth_token, oauth_token_secret } = req.query;
        if (oauth_token && oauth_token_secret) {
            return res.redirect(`https://www.flickr.com/services/oauth/authorize?oauth_token=${oauth_token}`);

        } else {
            res.render('signup');
        }
    } catch (e) {
        console.error(e);
    }

};

export const flickerAuthVerifierCtrl = async (req, res, nex) => {

    try {
        let { oauth_verifier, oauth_token } = req.query;
        oauth_verifier = '1516eefffc2c1ccd'//${oauth_verifier}
        oauth_token = '72157720850944400-f62f44843823e0fb';//${oauth_token}
        const oauth_nonce = '88JM21'//'uiKwLs'//${oauth_nonce}
        const customerKey = '969389cf00c43a96de24870c42b0e557';//${customerKey}
        const oauth_timestamp = 1658251080;//${oauth_timestamp}

        const { data } = await axios.get(`https://www.flickr.com/services/oauth/access_token?oauth_consumer_key=${customerKey}&oauth_token=${oauth_token}&oauth_signature_method=HMAC-SHA1&oauth_timestamp=${oauth_timestamp}&oauth_nonce=${oauth_nonce}&oauth_version=1.0&oauth_signature=SGrIdPzbxLqIxrz5NCfIH0FvtIc=&oauth_verifier=${oauth_verifier}`);



        console.log(data);


        res.render('signup');
    } catch (e) {
        console.log(e);
        res.render('signup');
    }

};

// console.log(Math.round(new Date().getTime() / 1000));

// console.log(v4().length);
// console.log(v4().slice(-6).toLocaleUpperCase());

function uuid4() {
    const template = 'xxxxxxxxxx4xxxyxxxxxxxxxxxx';
    const xAndYOnly = /[xy]/g;

    return template.replace(xAndYOnly, (character) => {
        const randomNo = Math.floor(Math.random() * 16);
        const newValue = character === 'x' ? randomNo : (randomNo & 0x3) | 0x8;

        return newValue.toString(16);
    });
}





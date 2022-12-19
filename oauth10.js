const crypto = require('crypto')
const OAuth = require('oauth-1.0a');
const base_string = 'fkdjfkdjfkjfdjfkdfdkjfkddlfjkdjkdjfkd';
// const key = 'SECRET';
const key = '72157720850896578-7fa6cf7df2d83b84'
const oauth = OAuth({
    consumer: { key, secret: 'e86ba37789d57682' },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        // return crypto
        //     .createHmac('sha1', key)
        //     .update(base_string)
        //     .digest('base64')

        return crypto.createHmac('sha1', '43')

            // updating data
            .update(base_string)

            // Encoding to be used
            .digest("base64")
    },
});
console.log(oauth.hash_function());


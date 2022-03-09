import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

const LocalStrategy = passportLocal.Strategy;

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user === undefined) {
            return done(null, false, {
                message: 'No user with that email found',
            });
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log('passwords matched');
                return done(null, user);
            } else {
                console.log('passwords did not match');
                return done(null, false, { message: 'Incorrect password' });
            }
        } catch (e) {
            done(e);
        }
    };

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, authenticateUser)
    );
    passport.serializeUser((user, done) => done(null, user.user_id));
    passport.deserializeUser((user_id, done) => {
        done(null, getUserById(user_id));
    });
}

export default initialize;

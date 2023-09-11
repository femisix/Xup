export const LoginStart =(userCredentials) => ({           //each are actions that should be executed. while taking "user" credentials
    type:"LOGIN_START"
});

export const LoginSuccess =(user) => ({
    type:"LOGIN_SUCCESS",
    payload: user,              //the user here will go to our reducer
});

export const LoginFailure =(error) => ({
    type:"LOGIN_FAILURE",
    payload: error,             //writing "payload" isn't neccessary, it's just a common usage
});
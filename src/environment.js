const environment = {};

if (process.env.REACT_APP_ENV === 'production') {
    environment.APP_NAME = 'APP IN PROD.'
}

if (process.env.REACT_APP_ENV === 'development') {
    environment.APP_NAME = 'APP IN DEV.'
}

if (process.env.REACT_APP_ENV === 'test') {
    environment.APP_NAME = 'APP IN TEST.'
}

export {environment}
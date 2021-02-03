export PORT=7500
export tipestry_logRequest=false
export tipestry_db=mongodb://localhost/tipestry
export tipestry_posts_api=/.netlify/functions/tipestry/posts
export tipestry_logins_api=/.netlify/functions/tipestry/logins
export tipestry_users_api=/.netlify/functions/tipestry/users
export tipestry_home_api=/.netlify/functions/tipestry
npx jest --verbose --setupTestFrameworkScriptFile='<rootDir>/jest.cleanup.js' --testEnvironment node --runInBand

module.exports = {
    env: 'dev',
    port: 700,
    mysql: {
        aws: {
            host: 'rm-bp1unw7c36td50v149o.mysql.rds.aliyuncs.com',
            username: 'root',
            database: 'unsw9900db',
            password: 'UNSW9900db',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        }
    }
    ,s3: {
        signatureVersion: 'v4',
        apiVersion: '2006-03-01',
        region: 'us-east-2'
    },
    keys: {
        jwt: "COMP990022T2glhf"
    }
}
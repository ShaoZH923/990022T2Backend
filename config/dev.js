module.exports = {
    env: 'dev',
    port: 700,
    mysql: {
        aws: {
            host: 'unsw9900mysql.ciyyguazhvvt.ap-east-1.rds.amazonaws.com',
            username: 'root',
            database: 'unsw9900db',
            password: 'unsw9900',
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
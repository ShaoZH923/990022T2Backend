module.exports = {
    env: 'dev',
    port: 700,
    mysql: {
        aws: {
            host: 'unsw990022t2glhfdb.cwrvrcvaupxq.us-west-1.rds.amazonaws.com',
            username: 'admin',
            database: 'unsw990022t2glhfdb',
            password: 'HTPVqsX0qgy3uuLNGbkm',
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
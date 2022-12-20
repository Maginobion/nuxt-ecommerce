import Product from "~~/server/db/models/product"
import aws from 'aws-sdk'


export default defineEventHandler(async (event)=>{

    const receivedProduct : FormData = await readBody(event)

    console.log(event.req.headers)

    const config = useRuntimeConfig()

    // console.log(receivedProduct)

    // const test = new Product(receivedProduct)

    // aws.config.update({
    //     signatureVersion: 'v4',
    //     region: 'eu-central-1',
    //     accessKeyId: config.awsKey,
    //     secretAccessKey: config.awsSecret
    // })

    // const s3 = new aws.S3({
    //     region: 'sa-east-1',
    //     accessKeyId: config.awsKey,
    //     secretAccessKey: config.awsSecret
    // })
    
    // s3.getSignedUrlPromise()

    // const signFile = (filePath) => {
    //     return new Promise((resolve, reject) => {
    //         const params = {
    //             Bucket: config.aws.bucket,
    //             Fields: {
    //                 key: filePath
    //             },
    //             Expires: config.aws.expire,
    //             Conditions: [
    //                 ['content-length-range', 0, 10000000], // 10 Mb
    //                 {'acl': 'public-read'}
    //             ]
    //         };
    //         s3.createPresignedPost(params, (err, data) => {
    //             resolve(data);
    //         });
    //     });
    // };
    
    // const sendFile = (filePath, payload) => {

    //     form.append('acl', 'public-read');
    //     for(const field in payload.fields) {
    //         form.append(field, payload.fields[field]);
    //     }
    //     form.append('file', fs.createReadStream(__dirname + `/${filePath}`));
    //     form.getLength((err, length) => {
    //         console.log(`Length: ${length}`)
    //         fetch(payload.url, {
    //             method: 'POST',
    //             body: form,
    //             headers: {
    //                 'Content-Type': false,
    //                 'Content-Length': length
    //             }
    //         })
    //         .then((response) => {
    //             console.log(response.ok);
    //             console.log(response.status);
    //             console.log(response.statusText);
    //             return response.text();
    //         })
    //         .then((payload) => {
    //             console.log(payload);
    //             console.log(form.getHeaders())
    //         })
    //         .catch((err) => console.log(`Error: ${err}`))
    //     })
    
    // } 
    
    // const file = 'test.pdf';
    // const filePath = `files/new/${file}`;
    // signFile(filePath)
    // .then((payload) => { sendFile(file, payload); });

    // test.save()

    // return test
})
import { upload } from '@testing-library/user-event/dist/upload';
import S3FileUpload from 'react-s3';
import { uploadFile } from 'react-s3';

const config = {
    bucketName: 'buono-gelato-app-products-image',
    region: 'eu-west-2',
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY,
}

export default function Upload(){
    const upload = async (event) =>{
        await S3FileUpload.uploadFile(event.target.files[0], config)
    }
    return(
        <>
        Upload Image!
        <input type="file" onChange={upload}/> 
        </>
        
    )
}
    

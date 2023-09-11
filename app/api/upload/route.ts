// export async function GET(request: Request) {}
// this is the most basic type of get request in next
import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key:process.env.CLOUDINARY_KEY, 
  api_secret:process.env.CLOUDINARY_SECRET
});
export async function POST(request: Request) {
  // coming from the body from the frontend
  const { path } = await request.json();
  if (!path) {
    return NextResponse.json(
      { message: "Image Path Needed!!!" },
      { status: 400 }
    );
  }
  // way to upload to cloudinary has changed only to this.....
  try {
       const options ={
        use_filename:true,
        unique_filename:true,
        overwrite:true,
        transformation:[{width:1000,height:750,crop:"scale"}]
       } 
       const res = await cloudinary.uploader.upload(path, options);
       return NextResponse.json(res,{status:200})
    } catch (error) {
      return NextResponse.json({message:"Error Uploading Image"},{status:200})
    
  }
}

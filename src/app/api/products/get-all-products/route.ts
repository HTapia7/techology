import { connect } from "@/dbConfig/dbConfig";
import { NextRequest , NextResponse} from "next/server";
import Product from "@/models/product";

connect();

export async function GET(request: NextRequest){
  try {
    const getAllProducts = await Product.find()
    
    console.log(getAllProducts)

    return NextResponse.json(
      { message: "All products listed below", getAllProducts},
      { status: 201 }
    );

  } catch (error) {
    console.log(error)
  }
  
}
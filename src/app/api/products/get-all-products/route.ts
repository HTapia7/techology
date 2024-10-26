import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

connect();

export async function GET(request: NextRequest) {
  try {
    const getAllProducts = await Product.find();

    return NextResponse.json(
      { message: "All products listed below", products: getAllProducts },
      { status: 200 } 
    );
  } catch (error: any) {
   
    return NextResponse.json(
      { message: "Error getting products", error: error.message },
      { status: 500 }
    );
  }
}

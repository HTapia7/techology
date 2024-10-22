import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

// Make sure the database is connected
connect();

export async function PUT(request: NextRequest){
  try {
    const { id, name , price , image } = await request.json()

    if (!id || !name || !price || !image) {
      return NextResponse.json({ error: "Product ID and update data are required" }, { status: 400 });
    }
  
  } catch (error) {
    
  }
};
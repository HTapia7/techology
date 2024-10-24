import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";
import toast from "react-hot-toast";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    // Add image later 
    const { name, price, description , quantity} = reqBody;

    if (!name || !price || !description || !quantity) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, description or quantity " },
        { status: 400 }
      );
    }

    console.log(reqBody);

    const newProduct = new Product({
      name,
      price,
      // image,
      description,
      quantity
    });

    const savedProduct = await newProduct.save();
    console.log(savedProduct);

    return NextResponse.json(
      { message: "Product created successfully", product: savedProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

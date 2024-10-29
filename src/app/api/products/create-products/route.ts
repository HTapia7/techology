import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, price, description, quantity, image } = reqBody;

    if (!name || !price || !description || !quantity || !image) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, description, quantity, or image." },
        { status: 400 }
      );
    }

    const newProduct = new Product({
      name,
      price,
      image,
      description,
      quantity
    });

    const savedProduct = await newProduct.save();
    return NextResponse.json(
      { message: "Product created successfully", product: savedProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    const statusCode = error.name === "ValidationError" ? 400 : 500;
    return NextResponse.json({ error: error.message }, { status: statusCode });
  }
}

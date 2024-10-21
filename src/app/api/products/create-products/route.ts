import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, price, image } = reqBody;

    if (!name || !price || !image) {
      return NextResponse.json(
        { error: "Missing required fields: name, price, or image" },
        { status: 400 }
      );
    }

    console.log(reqBody);

    const newProduct = new Product({
      name,
      price,
      image,
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

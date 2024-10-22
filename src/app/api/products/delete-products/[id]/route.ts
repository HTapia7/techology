import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

// Make sure the database is connected
connect();

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Check if the product ID exists in the params
    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Find the product by ID and delete it
    const deleteProduct = await Product.findByIdAndDelete(id);

    // If the product was not found, return a 404 error
    if (!deleteProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return a success message and the deleted product
    return NextResponse.json(
      { message: "Product deleted successfully", product: deleteProduct }, 
      { status: 200 }
    );

  } catch (error: any) {
    // Handle any unexpected errors
    return NextResponse.json(
      { error: "An error occurred while deleting the product", details: error.message }, 
      { status: 500 }
    );
  }
}

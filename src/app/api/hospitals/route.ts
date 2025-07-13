import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    const hospitals = await prisma.hospital.findMany();
    return NextResponse.json(hospitals);
}

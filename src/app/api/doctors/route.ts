import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    const doctors = await prisma.doctor.findMany();
    return NextResponse.json(doctors);
}

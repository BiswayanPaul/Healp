import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import Fuse from "fuse.js";

const HOSPITAL_KEYWORDS = ['hospital', 'hospitals', 'clinic', 'medical college'];
const DOCTOR_KEYWORDS = ['doctor', 'doctors', 'physician', 'specialist'];
const PACKAGE_KEYWORDS = ['package', 'packages', 'test', 'checkup'];

export async function GET(req: NextRequest) {
    const rawQuery = req.nextUrl.searchParams.get("query") || "";
    const query = rawQuery.toLowerCase().trim();

    const includeAllHospitals = HOSPITAL_KEYWORDS.some(k => query.includes(k));
    const includeAllDoctors = DOCTOR_KEYWORDS.some(k => query.includes(k));
    const includeAllPackages = PACKAGE_KEYWORDS.some(k => query.includes(k));

    let doctors = [];
    let hospitals = [];

    if (includeAllDoctors) {
        doctors = await prisma.doctor.findMany();
    } else {
        const allDoctors = await prisma.doctor.findMany();
        const doctorFuse = new Fuse(allDoctors, {
            keys: ['name', 'speciality', 'degree'],
            threshold: 0.4, // Lower = stricter match
        });
        doctors = doctorFuse.search(query).map(result => result.item);
    }

    if (includeAllHospitals) {
        hospitals = await prisma.hospital.findMany();
    } else {
        const allHospitals = await prisma.hospital.findMany();
        const hospitalFuse = new Fuse(allHospitals, {
            keys: ['name', 'city', 'state', 'speciality'],
            threshold: 0.4,
        });
        hospitals = hospitalFuse.search(query).map(result => result.item);
    }

    // Optional: packages coming later...
    // let packages = [];
    // if (includeAllPackages) {
    //     packages = await prisma.package.findMany();
    // } else {
    //     const allPackages = await prisma.package.findMany();
    //     const packageFuse = new Fuse(allPackages, {
    //         keys: ['name', 'category'],
    //         threshold: 0.4,
    //     });
    //     packages = packageFuse.search(query).map(result => result.item);
    // }

    return NextResponse.json({
        doctors,
        hospitals,
        // packages
    });
}

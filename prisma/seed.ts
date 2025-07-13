import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/* -------------------------------------------------------------------------- */
/*                               MASTER DATASETS                              */
/* -------------------------------------------------------------------------- */

const hospitalData = [
    {
        name: "Medanta Medicity",
        address: "Sector 38, Gurugram",
        city: "Gurugram",
        state: "Haryana",
        speciality: "Cardiac Sciences",
        ratings: 4.6,
    },
    {
        name: "Ruby Hall Clinic",
        address: "Sassoon Road",
        city: "Pune",
        state: "Maharashtra",
        speciality: "Neurology",
        ratings: 4.3,
    },
    {
        name: "Christian Medical College",
        address: "Ida Scudder Rd",
        city: "Vellore",
        state: "Tamil Nadu",
        speciality: "Internal Medicine",
        ratings: 4.9,
    },
    {
        name: "KIMS Hospital",
        address: "Minister Road",
        city: "Hyderabad",
        state: "Telangana",
        speciality: "Orthopaedics",
        ratings: 4.5,
    },
    {
        name: "Narayana Health",
        address: "Hosur Road",
        city: "Bengaluru",
        state: "Karnataka",
        speciality: "Cancer Care",
        ratings: 4.4,
    },
];

const departmentTemplates = [
    { name: "Cardiology", bedCount: 40 },
    { name: "Neurology", bedCount: 35 },
    { name: "Oncology", bedCount: 38 },
    { name: "Orthopaedics", bedCount: 30 },
    { name: "Gastroenterology", bedCount: 28 },
    { name: "Endocrinology", bedCount: 25 },
    { name: "Pulmonology", bedCount: 22 },
    { name: "Pediatrics", bedCount: 32 },
    { name: "Dermatology", bedCount: 15 },
    { name: "Nephrology", bedCount: 20 },
];

const doctorPool = [
    { name: "Dr Ankit Bhargava", degree: "MBBS, MD", speciality: "Endocrinology", rating: 4.5, age: 44 },
    { name: "Dr Sneha Reddy", degree: "MBBS, DM", speciality: "Pulmonology", rating: 4.7, age: 39 },
    { name: "Dr Rajeev Nair", degree: "MBBS, MS", speciality: "Orthopaedics", rating: 4.6, age: 50 },
    { name: "Dr Amrita Das", degree: "MBBS, MD", speciality: "Nephrology", rating: 4.4, age: 42 },
    { name: "Dr Farhan Siddiqui", degree: "MBBS, DM", speciality: "Oncology", rating: 4.8, age: 46 },
    { name: "Dr Leena Joseph", degree: "MBBS, MD", speciality: "Cardiology", rating: 4.6, age: 48 },
    { name: "Dr Amitabh Roy", degree: "MBBS, MS", speciality: "Gastroenterology", rating: 4.3, age: 41 },
    { name: "Dr Priya Sharma", degree: "MBBS, MD", speciality: "Pediatrics", rating: 4.7, age: 37 },
    { name: "Dr Kabir Khan", degree: "MBBS, DM", speciality: "Cardiology", rating: 4.5, age: 45 },
    { name: "Dr Megha Jain", degree: "MBBS, MD", speciality: "Dermatology", rating: 4.2, age: 36 },
    { name: "Dr Rohan Kulkarni", degree: "MBBS, MS", speciality: "Orthopaedics", rating: 4.4, age: 49 },
    { name: "Dr Sarika Bose", degree: "MBBS, MD", speciality: "Neurology", rating: 4.8, age: 43 },
    { name: "Dr Nitin Chauhan", degree: "MBBS, DM", speciality: "Endocrinology", rating: 4.5, age: 47 },
    { name: "Dr Gauri Menon", degree: "MBBS, MD", speciality: "Pulmonology", rating: 4.6, age: 38 },
    { name: "Dr Yusuf Ali", degree: "MBBS, DM", speciality: "Nephrology", rating: 4.3, age: 52 },
];

const patientPool = [
    { name: "Aarav Mehta", age: 58, contact: "9988776655", familyContact: "Rekha Mehta – 9876543210", diagnosis: "Type 2 Diabetes" },
    { name: "Ishita Verma", age: 34, contact: "9123456789", familyContact: "Ravi Verma – 9011223344", diagnosis: "Asthma" },
    { name: "Manoj Sinha", age: 61, contact: "9000011122", familyContact: "Lata Sinha – 9888877665", diagnosis: "Hip Fracture" },
    { name: "Kritika Dey", age: 27, contact: "9445566778", familyContact: "Dipankar Dey – 9445566779", diagnosis: "Acne Vulgaris" },
    { name: "Suresh Patil", age: 48, contact: "9332244455", familyContact: "Maya Patil – 9332244456", diagnosis: "Chronic Kidney Disease" },
    { name: "Riya Shah", age: 22, contact: "9822110099", familyContact: "Rakesh Shah – 9822110088", diagnosis: "Migraine" },
    { name: "Vikas Gupta", age: 40, contact: "9811223344", familyContact: "Seema Gupta – 9811223355", diagnosis: "Hypertension" },
    { name: "Deepa Krishnan", age: 65, contact: "9876512345", familyContact: "Hari Krishnan – 9876512355", diagnosis: "COPD" },
    { name: "Omkar Joshi", age: 30, contact: "9765432109", familyContact: "Pooja Joshi – 9765432199", diagnosis: "Peptic Ulcer" },
    { name: "Neelam Singh", age: 55, contact: "9736441122", familyContact: "Aakash Singh – 9736441133", diagnosis: "Breast Cancer" },
    // Add more if needed...
];

// Shuffle utility
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/* -------------------------------------------------------------------------- */
/*                                   MAIN                                     */
/* -------------------------------------------------------------------------- */

async function main() {
    let doctorCount = 1;
    let patientCount = 0;

    // Step 1: Create all hospitals
    const hospitals = await Promise.all(
        hospitalData.map(h => prisma.hospital.create({ data: h }))
    );

    for (const hospital of hospitals) {
        // Step 2: Create 3 random departments
        const selectedDepts = shuffle(departmentTemplates).slice(0, 3);

        const departments = await Promise.all(
            selectedDepts.map(dept =>
                prisma.department.create({
                    data: {
                        ...dept,
                        hospitalId: hospital.id,
                    },
                })
            )
        );

        for (const dept of departments) {
            for (let i = 0; i < 3; i++) {
                const docTemplate = doctorPool[(doctorCount - 1) % doctorPool.length];

                const doctor = await prisma.doctor.create({
                    data: {
                        ...docTemplate,
                        name: `${docTemplate.name} ${doctorCount}`,
                        email: `doctor${doctorCount}@example.com`, // Ensure uniqueness
                    },
                });

                await prisma.doctorHospital.create({
                    data: {
                        doctorId: doctor.id,
                        hospitalId: hospital.id,
                    },
                });

                await prisma.department.update({
                    where: { id: dept.id },
                    data: {
                        doctors: {
                            connect: { id: doctor.id },
                        },
                    },
                });

                for (let p = 0; p < 2; p++) {
                    const patient = patientPool[patientCount % patientPool.length];

                    await prisma.patient.create({
                        data: {
                            ...patient,
                            departmentId: dept.id,
                            doctorId: doctor.id,
                        },
                    });

                    patientCount++;
                }

                doctorCount++;
            }
        }
    }

    console.log(`✅ Seed completed: ${hospitals.length} hospitals, ${doctorCount - 1} doctors, ${patientCount} patients.`);
}

/* -------------------------------------------------------------------------- */

main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error("❌ Seed failed:", e);
        await prisma.$disconnect();
        process.exit(1);
    });

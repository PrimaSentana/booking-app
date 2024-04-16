import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';

import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, { params }: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error()
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            // OR section is for allow the user or the owner of reservation delete the reservation trips
            OR: [
                {
                    userId: currentUser.id // who booking the reservation 
                },
                {
                    listing: { 
                        userId: currentUser.id //who own the reservation
                    }
                }
            ]
        }
    })

    return NextResponse.json(reservation)
}
import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export default async function getWishlist()  {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return []
        }

        const wishlists = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })

        const safeWishlist = wishlists.map((wishlist) => ({
            ...wishlist,
            createdAt: wishlist.createdAt.toISOString()
        }))

        return safeWishlist
    } catch(error: any) {
        throw new Error(error)
    }
}
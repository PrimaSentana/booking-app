import getCurrentUser from "../actions/getCurrentUser";
import getWishlist from "../actions/getWishlist"
import EmptyState from "../components/EmptyState"
import WishlistClient from "./WishlistClient";


const WishlistPage = async () => {
    const listings = await getWishlist();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No Wishlist"
                subtitle="Looks like you have no favorite properties"
            />
        )
    }

    return (
        <WishlistClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default WishlistPage
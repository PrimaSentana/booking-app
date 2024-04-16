import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";
import { SafeListing, SafeUser } from "../types"

interface WishlistClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const WishlistClient: React.FC<WishlistClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
        <Heading
            title="Wishlist"
            subtitle="Lists of places you have wishlist"
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gird-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {listings.map((listing) => (
                <ListingCard
                    currentUser={currentUser}
                    key={listing.id}
                    data={listing}
                />
            ))}
        </div>
    </Container>
  )
}

export default WishlistClient
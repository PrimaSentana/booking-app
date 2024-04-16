import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";

import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="There's a guest?"
                subtitle="Login to access this page"
            />
        )
    }

    const listings = await getListings({ userId: currentUser?.id })

    if (listings.length === 0) {
        return (
            <EmptyState
                title="There is no properties yet"
                subtitle="You have no properties"
            />
        )
    }

    return (
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default PropertiesPage
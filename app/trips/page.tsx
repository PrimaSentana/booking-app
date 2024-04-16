import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="There's a guest?"
                subtitle="Login to access this page"
            />
        )
    }

    const reservations = await getReservations({ userId: currentUser?.id })

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="There is no trips yet"
                subtitle="You haven't reserved any trips"
            />
        )
    }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage
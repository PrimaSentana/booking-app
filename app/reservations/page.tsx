import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title="There's a guest?"
                subtitle="Login to access this page"
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser?.id
    });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title="There is no reservations"
                subtitle="Looks like you have no reservation on your property"
            />
        )
    }

    return (
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default ReservationPage
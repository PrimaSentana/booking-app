'use client';

import qs from 'query-string';
import Modal from "./Modal"
import { useRouter, useSearchParams } from "next/navigation";
import useSearchModal from "@/app/hooks/useSearchModal"
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const [location, setLocation] = useState<CountrySelectValue>();

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [location]);
    
    const nextStep = useCallback(() => {
        setStep((value) => value + 1)
    }, [])

    const backStep = useCallback(() => {
        setStep((value) => value - 1)
    }, [])

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return nextStep();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        // change the type to string because it will be pass in the url
        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true})

        setStep(STEPS.LOCATION)
        searchModal.onClose();
        router.push(url)

    }, [step, searchModal, location, roomCount, bathroomCount, guestCount, params, dateRange, nextStep, router])

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.LOCATION) {
            return undefined
        }

        return 'Back'
    }, [step])

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Search places'
                subtitle='Find the perfect location'
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng}/>
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='When do you plan to go?'
                    subtitle='Set the perfect time'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='More information'
                    subtitle='Find the most comfortable'
                />
                <Counter
                    title='Guests'
                    subtitle='How many guests'
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Rooms'
                    subtitle='How many rooms'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Bathroom'
                    subtitle='How many bathrooms'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal
            title="Filters"
            actionLabel={actionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : backStep}
            secondaryActionLabel={secondaryActionLabel}
            isOpen={searchModal.isOpen}
            onSubmit={onSubmit}
            onClose={searchModal.onClose}
            body={bodyContent}
        />
    )
}

export default SearchModal
'use client';

import { useMemo, useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import useRentModal from "@/app/hooks/useRentModal";
import { categories } from "../navbar/Categories";
import CategoryInput from "./CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2, 
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            title: '',
            description: '',
            category: '',
            imageSrc: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            price: 1,
        }
    })

    const category = watch("category");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        })
    }

    const nextStep = () => {
        setStep((value) => value + 1);
    }

    const backStep = () => {
        setStep((value) => value - 1);
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return "Create"
        }

        return "Next"
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined
        }

        return "Back"
    }, [step]);

    // set to "let" cause it will changeable content
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Which of these best describe your place?"
                subtitle="Pick a category"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                            onClick={(category) => setCustomValue("category", category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.CATEGORY ? undefined : backStep}
            title="Find your place"
            body={bodyContent}
        />
    )
}

export default RentModal
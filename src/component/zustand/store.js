import { create } from "zustand";
import { persist } from "zustand/middleware";

const storeInventaris = create(
    persist(
        (set) => ({
            formInput: [],
            updatedForm: (value) =>
                set((state) => ({
                    formInput: value
                }))
        }),
        {
            name: "inventaris_data"
        }
    ))

export default storeInventaris;
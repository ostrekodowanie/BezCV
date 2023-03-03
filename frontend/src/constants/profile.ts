import { createContext } from "react";
import { CandidateProps, NonPercentageAbilitiesCandidateProps } from "./candidate";

export type StatsProps = {
    token_count: number,
    followed_count: number,
    purchased_count: number
}

export type ProfileDataType = {
    stats: StatsProps,
    purchased_contacts: NonPercentageAbilitiesCandidateProps[],
    followed_contacts: CandidateProps[]
}

export const initialProfileData: ProfileDataType = {
    stats: {
        token_count: 0,
        followed_count: 0,
        purchased_count: 0
    },
    purchased_contacts: [],
    followed_contacts: []
}

export const ProfileDataContext = createContext<ProfileDataType>(initialProfileData)
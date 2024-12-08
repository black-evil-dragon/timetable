import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UserInformation {
    firstName: string
    MiddleName: string
    LastName: string

    phone: string
    email: string

    createdAt: string
    updatedAt?: string
}

interface UserPreferences {
    // theme: 
    // language
    timezone: string,
}

interface User {
    id: string

    is_login: boolean
    is_active: boolean

    role: 'admin' | 'client' | 'guest'

    information: null | UserInformation

    preferenecs: null | UserPreferences

}


interface UserState {
    data: User,
}

const initialState: UserState = {
    data: {
        id: '',
        is_login: false,
        is_active: false,

        role: 'guest',

        information: null,

        preferenecs: null,
    }
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(
            state,
            action: PayloadAction<any>
        ) {

        }
    }
});

export const {

    set,

} = UserSlice.actions;

export default UserSlice.reducer
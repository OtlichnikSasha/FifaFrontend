import React from 'react';
import {
    Route,
    Routes
} from 'react-router-dom';
import {RegistrationPage} from "./pages/RegistrationPage";
import {AuthenticationPage} from "./pages/AuthenticationPage";
import {Cabinet} from "./pages/Cabinet";
import {Index} from "./pages/Index";
import {Results} from "./pages/Results";
import {User} from "./pages/User";

export const useRouter = (isAuthenticated: boolean) => {
    console.log('isAuthenticatedRouter', isAuthenticated)
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path='topPlayers' element={<Index/>}/>
                <Route path='results' element={<Results/>}/>
                <Route path='cabinet' element={<Cabinet/>}/>

                <Route path='user/:id' element={<User/>}/>
                <Route path="*" element={<Index/>}/>
            </Routes>
        )
    }

    return (
        <Routes>
            <Route path='topPlayers' element={<Index/>}/>
            <Route path='results' element={<Results/>}/>

            <Route path="user/sign_in" element={<AuthenticationPage/>}/>
            <Route path="user/sign_up" element={<RegistrationPage/>}/>
            <Route path='user/:id' element={<User/>}/>
            <Route path="*" element={<Index/>}/>
        </Routes>
    );
};


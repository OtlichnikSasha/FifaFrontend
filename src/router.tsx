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
const Router = () => {
    return (
        <Routes>
            <Route path='/topPlayers' element={<Index/>}/>
            <Route path='/results' element={<Results/>}/>
            <Route path='/cabinet' element={<Cabinet/>}/>

            <Route path='/user/:id' element={<User/>} />
            <Route path="/sign_in" element={<AuthenticationPage />} />
            <Route path="/sign_up" element={<RegistrationPage />} />
        </Routes>
    );
};

export default Router;